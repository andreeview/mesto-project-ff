function openPopup(popup) {
    popup.classList.add('popup_is-opened')

    const closeButton = popup.querySelector('.popup__close');

    closeButton.addEventListener('click', closePopup)
    popup.addEventListener('click', handleOverlayClose)
    document.addEventListener('keydown', handleEscapeClose)
}

function closePopup () {
    const openedPopup = document.querySelector('.popup_is-opened')
    const closeButton = openedPopup.querySelector('.popup__close');

    if (openedPopup) {
        closeButton.removeEventListener('click', closePopup)
        openedPopup.removeEventListener('click', handleOverlayClose)
        openedPopup.classList.remove('popup_is-opened')
        document.removeEventListener('keydown', handleEscapeClose)
    }
}

function handleOverlayClose (evt) {
    if (evt.currentTarget === evt.target) {
        closePopup()
    }
}

function handleEscapeClose (evt) {
    if (evt.key === 'Escape') {
        closePopup()
    }
}

export { closePopup, openPopup };