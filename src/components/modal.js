function turnOnPopup(popup, openButton) {
    openButton.addEventListener('click', () => openPopup(popup))

    const closeButton = popup.querySelector('.popup__close');

    addListenersToClose(popup, closeButton)
}

function addListenersToClose(popup, button) {

    button.addEventListener('click', () => closePopup())
    popup.addEventListener('click', evt => handleOverlayClose(evt))
    document.addEventListener('keydown', evt => handleEscapeClose(evt))
}

function openPopup(popup) {
    popup.classList.add('popup_is-opened')
}

function openImage(popup, openButton, title) {
    const openedImage = popup.querySelector('.popup__image')
    const openedImageTitle = popup.querySelector('.popup__caption')

    openButton.addEventListener('click', (evt) => {
        openedImage.src = evt.target.src;
        openedImage.alt = evt.target.alt;
        openedImageTitle.textContent = title.textContent
        openPopup(popup)
    })

    const closeButton = popup.querySelector('.popup__close');

    addListenersToClose(popup, closeButton)
}

function closePopup() {
    const openedPopup = document.querySelector('.popup_is-opened')

    if (openedPopup) {
        openedPopup.classList.remove('popup_is-opened')
    }
}

function handleOverlayClose(evt) {
    if (evt.currentTarget === evt.target) {
        closePopup()
    }
}

function handleEscapeClose(evt) {
    if (evt.key === 'Escape') {
        closePopup()
    }
}

export { openImage, turnOnPopup, closePopup, openPopup };