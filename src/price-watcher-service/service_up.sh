#!/bin/bash

# Путь для хранения PID файлов
PID_DIR="./pids"
mkdir -p "$PID_DIR"

# Устанавливаем зависимости
echo ""
echo "##############################"
echo "Установка зависимостей..."
echo ""
npm install
pip install -r requirements.txt

# Запускаем сервисы
echo ""
echo "##############################"
echo "Запуск сервиса по мониторингу цен..."
echo ""

# Запуск Python сервиса и сохранение PID
python service.py &> service.log &
PYTHON_PID=$!
echo $PYTHON_PID > "$PID_DIR/service.pid"
echo "Python сервис запущен с PID $PYTHON_PID"

# Запуск Node.js сервиса и сохранение PID
node index.js &> node.log &
NODE_PID=$!
echo $NODE_PID > "$PID_DIR/node.pid"
echo "Node.js сервис запущен с PID $NODE_PID"

echo ""
echo "##############################"
echo "Сервисы запущены."
