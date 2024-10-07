function openShareModal(title, about) {
    const overlay = document.createElement('div');
    overlay.classList.add('modal-overlay');

    const modal = document.createElement('div');
    modal.classList.add('modal-share');

    modal.innerHTML = `
        <div class="modal-share-content">
            <button class="share-button" id="copy-button">
                <img src="src/icons/copy.png" alt="Copy">
            </button>
            <button class="share-button">
                <img src="src/icons/vk.png" alt="Share VK">
            </button>
            <button class="share-button">
                <img src="src/icons/telegram.png" alt="Share Telegram">
            </button>
            <button class="share-button">
                <img src="src/icons/whatsapp.png" alt="Share WhatsApp">
            </button>
            <button class="share-button">
                <img src="src/icons/facebook.png" alt="Share Facebook">
            </button>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    document.body.classList.add('modal-open');

    overlay.addEventListener('click', closeShareModal);

    const copyButton = document.getElementById('copy-button');
    copyButton.addEventListener('click', () => {
        const textToCopy = `${title}\n${about}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            console.log('Текст скопирован в буфер обмена');
            closeShareModal();
        }).catch(err => {
            console.error('Ошибка при копировании текста: ', err);
        });
    });
}

function closeShareModal() {
    const modal = document.querySelector('.modal-share');
    const overlay = document.querySelector('.modal-overlay');
    if (modal && overlay) {
        modal.remove();
        overlay.remove();
        document.body.classList.remove('modal-open');
    }
}

