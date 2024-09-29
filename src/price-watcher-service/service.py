from flask import Flask, request, jsonify
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import os

app = Flask(__name__)

# Настройки для headless режима (запуск без открытия браузера)
chrome_options = Options()
chrome_options.add_argument("--headless")


# Функция для парсинга страницы
def scrape_website(url, selector):
    try:
        # Инициализация веб-драйвера
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=chrome_options)

        # Открываем страницу по переданному URL
        driver.get(url)

        # Ищем элементы по переданным селекторам
        results = []

        elements = driver.find_elements(By.CLASS_NAME, selector)
        for element in elements:
            results.append(element.text)

        driver.quit()

        # Возвращаем результат как строку
        return " ".join(results) if results else "Нет данных"
    except Exception as e:
        return str(e)


# Эндпоинт для обработки запросов
@app.route('/scrape', methods=['POST'])
def scrape():
    data = request.json
    url = data.get('url')
    selectors = data.get('selectors')

    if not url or not selectors:
        return jsonify({"error": "URL и селекторы обязательны"}), 400

    # Получаем данные с сайта
    result = scrape_website(url, selectors)

    return jsonify({"result": result})


# Запуск сервиса
app.run(port=5000)
