import os
import psycopg2

# Получаем переменные окружения из .env файла
from dotenv import load_dotenv

load_dotenv()

# Чтение переменных окружения
POSTGRES_USER = os.getenv('POSTGRES_USER')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
POSTGRES_DB = os.getenv('POSTGRES_DB')
HOST = os.getenv('HOST', 'localhost')  # по умолчанию localhost

# Путь к SQL файлу
SQL_FILE = 'init.sql'


def initialize_database():
    try:
        # Подключение к базе данных
        conn = psycopg2.connect(
            database=POSTGRES_DB,
            user=POSTGRES_USER,
            password=POSTGRES_PASSWORD,
            host=HOST,
            port='5430',
        )

        cursor = conn.cursor()

        # Пропуск инициализации, если они уже существуют
        cursor.execute("SELECT * FROM information_schema.tables WHERE table_name = 'users'")
        if cursor.fetchone():
            print("База данных уже инициализирована!")
            return

        # Чтение SQL-запросов из файла
        with open(SQL_FILE, 'r') as f:
            sql_commands = f.read()

        # Выполнение SQL-запросов
        cursor.execute(sql_commands)
        conn.commit()

        print("База данных успешно инициализирована!")

    except Exception as e:
        print(f"Ошибка при инициализации базы данных: {e}")


initialize_database()
