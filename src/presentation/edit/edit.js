function openEditModal(taskContainer) {
    let modal = document.getElementById("editModal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "editModal";
        modal.className = "modal";

        modal.innerHTML = `
            <div class="modal-content">
                <input id="miniInput" placeholder="Mini Input" style="background: #242320; color: #F0E3CA; margin-top: 20px;" />
                <textarea id="maxInput" placeholder="Max Input" style="background: #242320; color: #F0E3CA; height: 300px;"></textarea>

                <div class="modal-buttons">
                    <button-cancel-save id="cancelButton">Cancel</button-cancel-save>
                    <button-cancel-save id="saveButton">Save</button-cancel-save>
                </div>
            </div>
        `;

        modal.querySelector('#cancelButton').onclick = function () {
            modal.style.display = "none";
            modal.remove();
        };

        modal.querySelector('#saveButton').onclick = function () {
            const titleElement = taskContainer.querySelector('.task-title');
            const descriptionElement = taskContainer.querySelector('.task-about');
            const miniInputValue = modal.querySelector('#miniInput').value;
            const maxInputValue = modal.querySelector('#maxInput').value;

            titleElement.innerText = miniInputValue;
            descriptionElement.innerText = maxInputValue;

            const taskId = taskContainer.dataset.id;
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const updatedTasks = tasks.map(task => {
                if (task.id === taskId) {
                    return { id: taskId, title: miniInputValue, about: maxInputValue };
                }
                return task;
            });
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));

            modal.style.display = "none";
            modal.remove();
        };

        document.body.appendChild(modal);
    }

    modal.style.display = "flex";
}
