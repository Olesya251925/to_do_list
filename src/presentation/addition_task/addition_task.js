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
        openShareModal(taskContainer.querySelector(".task-title").innerText, taskContainer.querySelector(".task-about").innerText);
    });

    editIcon.addEventListener("click", function () {
        openEditModal(taskContainer);
    });

    infoIcon.addEventListener("click", function () {
        // Логика для кнопки Info
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

    iconsContainer.style.display = "none";
}