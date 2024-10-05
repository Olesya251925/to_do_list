document.addEventListener("DOMContentLoaded", function () {
    const tasks = document.querySelectorAll(".task-container");
    tasks.forEach(task => {
        addActionIcons(task);
    });
});

function addActionIcons(taskContainer) {
    const iconsContainer = document.createElement("div");
    iconsContainer.className = "icons-container";

    iconsContainer.innerHTML = `
        <button class="action-button" id="shareIcon">
            <img src="src/icons/sharee.png" alt="Share" class="action-icon">
        </button>
        <button class="action-button" id="infoIcon">
            <img src="src/icons/info.png" alt="Info" class="action-icon">
        </button>
        <button class="action-button" id="editIcon">
            <img src="src/icons/edit.png" alt="Edit" class="action-icon">
        </button>
    `;

    taskContainer.appendChild(iconsContainer);

    const shareIcon = iconsContainer.querySelector("#shareIcon");
    const editIcon = iconsContainer.querySelector("#editIcon");
    const infoIcon = iconsContainer.querySelector("#infoIcon");

    shareIcon.addEventListener("click", function () {

    });

    editIcon.addEventListener("click", function () {

    });

    infoIcon.addEventListener("click", function () {

    });

    taskContainer.addEventListener("mouseenter", function () {
        iconsContainer.style.display = "flex";
    });

    taskContainer.addEventListener("mouseleave", function () {
        setTimeout(function () {
            if (!iconsContainer.matches(':hover') && !taskContainer.matches(':hover')) {
                iconsContainer.style.display = "none";
            }
        }, 100);
    });

    iconsContainer.addEventListener("mouseenter", function () {
        iconsContainer.style.display = "flex";
    });

    iconsContainer.addEventListener("mouseleave", function () {
        setTimeout(function () {
            if (!iconsContainer.matches(':hover') && !taskContainer.matches(':hover')) {
                iconsContainer.style.display = "none";
            }
        }, 100);
    });

    iconsContainer.style.display = "none";
}
