#!/bin/bash

# Убедитесь, что все необходимые переменные окружения заданы
if [ ! -f .env ]; then
    echo "Файл .env не найден!"
    exit 1
fi

# Поднимаем контейнер PostgreSQL
echo "Запуск контейнера PostgreSQL..."
docker-compose up -d

# Устанавливаем зависимости
echo "Установка зависимостей..."
pip install -r requirements.txt

# Запускаем Python-скрипт для инициализации базы данных
echo "Запуск скрипта инициализации базы данных..."
python init_db.py