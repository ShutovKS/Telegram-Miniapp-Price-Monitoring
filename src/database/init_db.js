const fs = require('fs');
const {Client} = require('pg');
require('dotenv').config();

// Чтение переменных окружения
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_DB = process.env.POSTGRES_DB;
const HOST = process.env.HOST || 'localhost'; // по умолчанию localhost

// Путь к SQL файлу
const SQL_FILE = 'init.sql';

async function initializeDatabase() {
    const client = new Client({
        user: POSTGRES_USER,
        host: HOST,
        database: POSTGRES_DB,
        password: POSTGRES_PASSWORD,
        port: 5430, // используем 5430 порт
    });

    try {
        // Подключение к базе данных
        await client.connect();

        // Пропуск инициализации, если они уже существуют
        const res = await client.query("SELECT * FROM information_schema.tables WHERE table_name = 'users'");
        if (res.rowCount > 0) {
            console.log("База данных уже инициализирована!");
            return;
        }

        // Чтение SQL-запросов из файла
        const sqlCommands = fs.readFileSync(SQL_FILE, 'utf8');

        // Выполнение SQL-запросов
        await client.query(sqlCommands);

        console.log("База данных успешно инициализирована!");
    } catch (error) {
        console.error(`Ошибка при инициализации базы данных: ${error}`);
    } finally {
        // Закрытие подключения
        await client.end();
    }
}

initializeDatabase();
