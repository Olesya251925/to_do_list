document.addEventListener("DOMContentLoaded", loadTasks);

document.getElementById("addButton").addEventListener("click", function () {
    const title = document.getElementById("titleInput").value;
    const about = document.getElementById("aboutInput").value;

    if (title.trim() === "" || about.trim() === "") {
        alert("Пожалуйста, заполните все поля!");
        return;
    }

    const taskId = Date.now() + Math.random();
    createTaskElement(taskId, title, about);
    saveTasks();
    document.getElementById("titleInput").value = "";
    document.getElementById("aboutInput").value = "";
});

function createTaskElement(taskId, title, about) {
    const taskContainer = document.createElement("div");
    taskContainer.className = "task-container";
    taskContainer.dataset.id = taskId;

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
    const deleteButton = taskContainer.querySelector(".delete-button");
    addDeleteButtonListener(deleteButton, taskContainer);

    taskContainer.addEventListener("mouseenter", function () {
        taskContainer.classList.add("hover");
    });

    taskContainer.addEventListener("mouseleave", function () {
        taskContainer.classList.remove("hover");
    });

    const taskMessage = document.getElementById("taskMessage");
    taskMessage.appendChild(taskContainer);
    toggleTaskLines();
}

function saveTasks() {
    const tasks = Array.from(document.querySelectorAll(".task-container")).map(container => {
        const title = container.querySelector(".task-title").innerText;
        const about = container.querySelector(".task-about").innerText;
        const id = container.dataset.id;
        return { id, title, about };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task.id, task.title, task.about);
    });
    toggleTaskLines();
}

function toggleTaskLines() {
    const taskMessage = document.getElementById("taskMessage");
    const taskContainers = taskMessage.querySelectorAll(".task-container");
    const taskLines = taskMessage.querySelectorAll(".task-line");
    const noTaskMessage = document.getElementById("noTaskMessage");

    if (taskContainers.length > 0) {
        taskLines.forEach(line => line.remove());
        if (noTaskMessage) {
            noTaskMessage.remove();
        }
    } else {
        if (!noTaskMessage) {
            const topLine = document.createElement("hr");
            topLine.className = "task-line";
            taskMessage.insertBefore(topLine, taskMessage.firstChild);

            const noTaskMessage = document.createElement("span");
            noTaskMessage.id = "noTaskMessage";
            noTaskMessage.innerText = "No Task";
            taskMessage.appendChild(noTaskMessage);

            const bottomLine = document.createElement("hr");
            bottomLine.className = "task-line";
            taskMessage.appendChild(bottomLine);
        }
    }
}
