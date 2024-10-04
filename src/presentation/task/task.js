// Загрузка задач из localStorage при загрузке страницы
document.addEventListener("DOMContentLoaded", loadTasks);

document.getElementById("addButton").addEventListener("click", function() {
    // Получаем значения из полей ввода
    const title = document.getElementById("titleInput").value;
    const about = document.getElementById("aboutInput").value;
    
    // Проверяем, что поля не пустые
    if (title.trim() === "" || about.trim() === "") {
        alert("Пожалуйста, заполните все поля!");
        return;
    }

    // Создаем новый элемент задачи с уникальным ID
    const taskId = Date.now() + Math.random(); // Генерируем уникальный ID
    const taskContainer = document.createElement("div");
    taskContainer.className = "task-container";
    taskContainer.dataset.id = taskId; // Сохраняем ID в data-атрибуте

    // Используем innerHTML для добавления содержимого
    taskContainer.innerHTML = `
    <div class="task-container__text">
        <h3 class="task-title">${title}</h3>
        <p class="task-about">${about}</p>
    </div>
    <div class="delete-button">
        <img src="src/icons/cross.png" alt="Удалить">
    </div>
    `;

    // Добавляем обработчик события для кнопки удаления
    taskContainer.querySelector(".delete-button").addEventListener("click", function() {
        taskContainer.remove(); // Удаляем задачу
        saveTasks(); // Сохраняем изменения в localStorage
        toggleTaskLines(); // Проверяем, нужно ли отображать линии
    });

    // Находим контейнер для сообщений и добавляем новую задачу
    const taskMessage = document.getElementById("taskMessage");

    // Добавляем новую задачу в контейнер задач
    taskMessage.appendChild(taskContainer);

    // Сохраняем задачи в localStorage
    saveTasks();
    
    // Проверяем, нужно ли отображать линии
    toggleTaskLines();

    // Очищаем поля ввода
    document.getElementById("titleInput").value = "";
    document.getElementById("aboutInput").value = "";
});

// Функция для сохранения задач в localStorage
function saveTasks() {
    const tasks = Array.from(document.querySelectorAll(".task-container")).map(container => {
        const title = container.querySelector(".task-title").innerText;
        const about = container.querySelector(".task-about").innerText;
        const id = container.dataset.id; // Получаем ID из data-атрибута
        return { id, title, about }; // Сохраняем ID вместе с данными задачи
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция для загрузки задач из localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskContainer = document.createElement("div");
        taskContainer.className = "task-container";
        taskContainer.dataset.id = task.id; // Сохраняем ID в data-атрибуте
        
        taskContainer.innerHTML = `
        <div class="task-container__text">
            <h3 class="task-title">${task.title}</h3>
            <p class="task-about">${task.about}</p>
        </div>
        <div class="delete-button">
            <img src="src/icons/cross.png" alt="Удалить">
        </div>
        `;
        
        // Добавляем обработчик события для кнопки удаления
        taskContainer.querySelector(".delete-button").addEventListener("click", function() {
            taskContainer.remove(); // Удаляем задачу
            saveTasks(); // Сохраняем изменения в localStorage
            toggleTaskLines(); // Проверяем, нужно ли отображать линии
        });

        // Находим контейнер для сообщений и добавляем новую задачу
        const taskMessage = document.getElementById("taskMessage");
        taskMessage.appendChild(taskContainer);
    });
    
    // Проверяем, нужно ли отображать линии
    toggleTaskLines();
}

// Функция для проверки и скрытия/отображения линий
function toggleTaskLines() {
    const taskMessage = document.getElementById("taskMessage");
    const taskContainers = taskMessage.querySelectorAll(".task-container");
    
    // Удаляем линии и текст сообщения, если есть задачи
    const taskLines = taskMessage.querySelectorAll(".task-line");
    const noTaskMessage = document.getElementById("noTaskMessage");

    // Удаляем линии и сообщение, если есть задачи
    if (taskContainers.length > 0) {
        taskLines.forEach(line => line.remove());
        if (noTaskMessage) {
            noTaskMessage.remove(); // Удаляем сообщение "No Task"
        }
    } else {
        // Если задач нет, добавляем линии и текст сообщения
        if (!noTaskMessage) {
            const topLine = document.createElement("hr");
            topLine.className = "task-line"; // Добавляем класс для стилизации
            taskMessage.insertBefore(topLine, taskMessage.firstChild); // Добавляем верхнюю линию

            const noTaskMessage = document.createElement("span");
            noTaskMessage.id = "noTaskMessage";
            noTaskMessage.innerText = "No Task"; // Сообщение при отсутствии задач
            taskMessage.appendChild(noTaskMessage);

            const bottomLine = document.createElement("hr");
            bottomLine.className = "task-line"; // Добавляем класс для стилизации
            taskMessage.appendChild(bottomLine); // Добавляем нижнюю линию
        }
    }
}
