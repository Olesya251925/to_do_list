document.getElementById("addButton").addEventListener("click", function() {
    // Получаем значения из полей ввода
    const title = document.getElementById("titleInput").value;
    const about = document.getElementById("aboutInput").value;
    
    // Проверяем, что поля не пустые
    if (title.trim() === "" || about.trim() === "") {
        alert("Пожалуйста, заполните все поля!");
        return;
    }

    // Создаем новый элемент задачи
    const taskContainer = document.createElement("div");
    taskContainer.className = "task-container";

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
    });

    // Находим контейнер для сообщений и добавляем новую задачу
    const taskMessage = document.getElementById("taskMessage");

    // Проверяем, есть ли уже сообщения о задачах
    const noTaskMessage = document.getElementById("noTaskMessage");
    if (noTaskMessage) {
        noTaskMessage.remove(); // Удаляем сообщение "No Task"
        
        // Удаляем линии
        const taskLines = document.querySelectorAll(".task-line");
        taskLines.forEach(line => line.remove());
    }

    // Добавляем новую задачу в контейнер задач
    taskMessage.appendChild(taskContainer);
    
    // Очищаем поля ввода
    document.getElementById("titleInput").value = "";
    document.getElementById("aboutInput").value = "";
});
