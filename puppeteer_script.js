const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Путь к вашему JavaScript коду
const scriptPath = path.join(__dirname, 'generate_and_save.js');

(async () => {
    // Запускаем Puppeteer
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Открываем сайт
    await page.goto('https://goosegenerator.com/', { waitUntil: 'networkidle2' });

    // Проверяем наличие элемента кнопки развертывания
    const toggleButtonSelector = 'span.label-text[role="button"]';
    await page.waitForSelector(toggleButtonSelector, { visible: true });
    console.log('Кнопка развертывания найдена.');

    // Нажимаем на кнопку развертывания
    await page.click(toggleButtonSelector);
    console.log('Кнопка развертывания UI нажата.');

    // Дождемся, пока UI полностью развернется
    await new Promise(resolve => setTimeout(resolve, 3000)); // Задержка для раскрытия UI

    // Убедимся, что нужные элементы для генерации загружены
    const generateButtonSelector = "#root > div > div.react-dat-gui > ul > li:nth-child(8) > span";
    await page.waitForSelector(generateButtonSelector, { visible: true });
    console.log('Кнопка генерации найдена.');

    // Читаем JavaScript код
    const scriptContent = fs.readFileSync(scriptPath, 'utf8');

    // Вставляем и выполняем JavaScript код в браузере
    await page.evaluate(scriptContent);

    // Закрываем браузер
    await browser.close();
})();
