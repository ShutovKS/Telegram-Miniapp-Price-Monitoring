import {Builder, By, until, Browser} from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

async function parse_webpage(url, selector, retries = 3) {
    let options = new chrome.Options();

    options.addArguments(
        '--headless', // Запуск в безголовом режиме
        '--disable-gpu', // Отключение GPU
        '--no-sandbox', // Отключение песочницы
        '--disable-dev-shm-usage', // Отключение использования /dev/shm
        '--disable-extensions', // Отключение расширений
        '--disable-infobars', // Отключение инфо-панели
        '--disable-blink-features=AutomationControlled', // Отключение автоматизации
        '--enable-unsafe-swiftshader', // Включение небезопасного SwiftShader
        '--disable-web-security', // Отключение веб-безопасности
        '--ignore-certificate-errors', // Игнорирование ошибок сертификата
        '--disable-popup-blocking', // Отключение блокировки всплывающих окон
        '--disable-logging', // Отключение логирования
        '--disable-background-networking', // Отключение фоновой сети
        '--disable-background-timer-throttling', // Отключение фонового замедления таймера
        '--disable-backgrounding-occluded-windows', // Отключение фоновых окон
        '--disable-breakpad', // Отключение Breakpad
        '--disable-client-side-phishing-detection', // Отключение клиентского обнаружения фишинга
        '--disable-component-extensions-with-background-pages', // Отключение компонентных расширений с фоновыми страницами
        '--disable-default-apps', // Отключение приложений по умолчанию
        '--disable-features=TranslateUI,BlinkGenPropertyTrees', // Отключение функций
        '--disable-ipc-flooding-protection', // Отключение защиты от потопления IPC
        '--disable-renderer-backgrounding', // Отключение фонового рендеринга
        '--disable-sync', // Отключение синхронизации
        '--disable-translate', // Отключение перевода
        '--metrics-recording-only', // Только запись метрик
        '--no-first-run', // Без первого запуска
        '--safebrowsing-disable-auto-update', // Отключение автоматического обновления безопасного просмотра
        '--ignore-ssl-errors', // Игнорирование ошибок SSL
        '--ignore-certificate-errors', // Игнорирование ошибок сертификата
    );

    options.setUserPreferences({
        'profile.managed_default_content_settings.images': 2,
        'profile.managed_default_content_settings.stylesheets': 2,
    });

    let driver;
    try {
        driver = await new Builder()
            .forBrowser(Browser.CHROME)
            .setChromeOptions(options)
            .build();

        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                console.log(`[Attempt ${attempt + 1}] Navigating to: ${url}`);
                await driver.get(url);

                const timeout = 30000;
                console.log(`[Attempt ${attempt + 1}] Waiting for element: ${selector}`);
                await driver.wait(until.elementLocated(By.className(selector)), timeout);

                let elements = await driver.findElements(By.className(selector));
                let data = await Promise.all(elements.map(async element => {
                    return await element.getText();
                }));

                data = [...new Set(data)];
                if (data.length > 0) {
                    console.log(`[Attempt ${attempt + 1}] Extracted data:`, data);
                    return data;
                } else {
                    console.log(`[Attempt ${attempt + 1}] No relevant data found.`);
                    return ['No data found'];
                }

            } catch (error) {
                console.error(`[Attempt ${attempt + 1}] Error during scraping:`, error);
                if (attempt + 1 === retries) {
                    console.log('Max retry attempts reached. Failing.');
                    return ['Error occurred during scraping'];
                } else {
                    console.log('Retrying...');
                }
            }
        }
    } finally {
        if (driver) {
            await driver.quit();
        }
    }
}

export default parse_webpage;
