// Количество генераций
const numGenerations = 100;

// Функция для генерации изображения
async function generateImage() {
    return new Promise((resolve) => {
        // Нажимаем на кнопку генерации
        document.querySelector("#root > div > div.react-dat-gui > ul > li:nth-child(8) > span").click();
        console.log('Нажата кнопка генерации');

        // Ждем несколько секунд, чтобы изображение успело сгенерироваться
        const waitForSVG = setInterval(() => {
            if (document.querySelector('svg')) {
                clearInterval(waitForSVG);
                console.log('SVG элемент найден');
                resolve();
            }
        }, 1000); // Проверяем каждые 1 секунду
    });
}

// Функция для сохранения изображения
function saveImage(index) {
    const svgElement = document.querySelector('svg');
    if (!svgElement) {
        console.error('SVG элемент не найден!');
        return;
    }

    // Извлекаем SVG-код
    const svgCode = svgElement.outerHTML;

    // Получаем название файла из элемента <title>
    const titleElement = svgElement.querySelector('title');
    let fileTitle = `goose-pfp-${index}`;
    if (titleElement) {
        fileTitle = titleElement.textContent.split(' by ')[0].trim();
    }

    // Создаем ссылку для скачивания
    const blob = new Blob([svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileTitle}-${index}.svg`;  // Имя файла с расширением
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Освобождаем ресурсы
    URL.revokeObjectURL(url);
    console.log(`Изображение ${index} сохранено`);
}

// Функция для выполнения генераций и сохранений
async function performGenerations(numGenerations) {
    for (let i = 1; i <= numGenerations; i++) {
        console.log(`Начало генерации ${i}`);
        await generateImage();
        console.log(`Генерация ${i} завершена. Сохраняем...`);
        saveImage(i);
        // Опционально, можно добавить задержку между генерациями
        await new Promise(resolve => setTimeout(resolve, 1000)); // Задержка в  секунды
    }
}

// Запускаем множественные генерации и сохранения
performGenerations(numGenerations);
