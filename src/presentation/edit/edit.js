function openEditModal(taskContainer) {
    let modal = document.getElementById("editModal");
    const titleElement = taskContainer.querySelector('.task-title');
    const descriptionElement = taskContainer.querySelector('.task-about');

    if (!modal) {
        modal = document.createElement("div");
        modal.id = "editModal";
        modal.className = "modal";

        modal.innerHTML = `
     <div class="modal-content">
        <input id="miniInput" class="modal-input" placeholder="Mini Input" />
        <textarea id="maxInput" class="modal-textarea" placeholder="Max Input"></textarea>

        <div class="modal-buttons">
            <button-cancel-save id="cancelButton">Cancel</button-cancel-save>
            <button-cancel-save id="saveButton">Save</button-cancel-save>
        </div>
        <p id="error-message" class="error-message">Both fields must be filled in!</p>
    </div>
`;
        modal.querySelector('#cancelButton').onclick = function () {
            modal.style.display = "none";
            modal.remove();
        };

        modal.querySelector('#saveButton').onclick = function () {
            const miniInputValue = modal.querySelector('#miniInput').value.trim();
            const maxInputValue = modal.querySelector('#maxInput').value.trim();

            if (!miniInputValue || !maxInputValue) {
                const errorMessage = modal.querySelector('#error-message');
                errorMessage.style.display = 'block';
                return;
            }

            titleElement.innerText = miniInputValue;
            descriptionElement.innerText = maxInputValue.length > 50 ? maxInputValue.substring(0, 50) + "..." : maxInputValue;
            descriptionElement.setAttribute("title", maxInputValue);


            const taskId = taskContainer.dataset.id;
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const updatedTasks = tasks.map(task => {
                if (task.id === taskId) {
                    return { id: taskId, title: miniInputValue, about: maxInputValue };
                }
                return task;
            });
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));

            loadTasks();

            modal.style.display = "none";
            modal.remove();
        };


        document.body.appendChild(modal);
    }

    modal.querySelector('#miniInput').value = titleElement.innerText;
    modal.querySelector('#maxInput').value = descriptionElement.getAttribute("title");

    modal.style.display = "flex";
}
