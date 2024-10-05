document.addEventListener("DOMContentLoaded", function () {
    const deleteButtons = document.querySelectorAll(".delete-button");

    deleteButtons.forEach(button => {
        const taskContainer = button.closest(".task-container");
        addDeleteButtonListener(button, taskContainer);
    });
});

function addDeleteButtonListener(button, taskContainer) {
    button.addEventListener("click", function () {
        closeAllModals();

        const modalHTML = `
            <div id="confirmDeleteModal" class="modal-button-delete">
                <div class="modal-content-button-delete">
                    <div class="modal-border-top-button-delete"></div>
                    <div class="modal-header-button-delete">
                        <h3 style="color: #FFFFFF; text-align: center;">Delete this task?</h3>
                    </div>
                    <div class="modal-buttons-button-delete">
                        <button id="confirmDeleteButton" class="button-button-delete">Yes</button>
                        <button id="cancelDeleteButton" class="button-button-delete">No</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const modal = document.getElementById("confirmDeleteModal");

        modal.style.display = "block";

        document.getElementById("confirmDeleteButton").onclick = function () {
            taskContainer.remove();
            saveTasks();
            modal.style.display = "none";
            modal.remove();
        };

        document.getElementById("cancelDeleteButton").onclick = function () {
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

function closeAllModals() {
    const openModals = document.querySelectorAll('.modal-button-delete');
    openModals.forEach(modal => {
        modal.style.display = 'none';
        modal.remove();
    });
}
