#!/bin/bash

# Путь для PID файлов
PID_DIR="./pids"

# Функция для остановки процесса по PID
stop_process() {
    local pid_file="$1"

    if [ -f "$pid_file" ]; then
        PID=$(cat "$pid_file")
        if kill -0 $PID > /dev/null 2>&1; then
            echo "Останавливаем процесс с PID $PID..."
            kill $PID
            rm -f "$pid_file"
            echo "Процесс остановлен."
        else
            echo "Процесс с PID $PID не найден. Возможно, он уже остановлен."
            rm -f "$pid_file"
        fi
    else
        echo "Файл PID не найден: $pid_file"
    fi
}

# Останавливаем сервисы
echo ""
echo "##############################"
echo "Останавливаем сервисы по мониторингу цен..."
echo ""

# Остановка Python сервиса
stop_process "$PID_DIR/service.pid"

# Остановка Node.js сервиса
stop_process "$PID_DIR/node.pid"

echo ""
echo "##############################"
echo "Сервисы остановлены."
