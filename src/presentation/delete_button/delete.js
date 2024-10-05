document.addEventListener("DOMContentLoaded", function () {
    const deleteButtons = document.querySelectorAll(".delete-button");

    deleteButtons.forEach(button => {
        const taskContainer = button.closest(".task-container");
        addDeleteButtonListener(button, taskContainer);
    });
});

function addDeleteButtonListener(button, taskContainer) {
    button.addEventListener("click", function () {
        const taskId = taskContainer.dataset.id;

        const modalHTML = `
            <div id="confirmDeleteModal" class="modal">
                <div class="modal-content">
                    <div class="modal-border-top"></div>
                    <div class="modal-header">
                        <h3 style="color: #FFFFFF; text-align: center;">Delete this task?</h3>
                    </div>
                    <div class="modal-buttons">
                        <button id="confirmDeleteButton" class="button">Yes</button>
                        <button id="cancelDeleteButton" class="button">No</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const modal = document.getElementById("confirmDeleteModal");
        const confirmDeleteButton = document.getElementById("confirmDeleteButton");
        const cancelDeleteButton = document.getElementById("cancelDeleteButton");

        modal.style.display = "block";

        confirmDeleteButton.onclick = function () {
            taskContainer.remove();
            saveTasks();
            modal.style.display = "none";
            modal.remove();
        };

        cancelDeleteButton.onclick = function () {
            modal.style.display = "none";
            modal.remove();
        };

        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
                modal.remove();
            }
        };
    });
}
