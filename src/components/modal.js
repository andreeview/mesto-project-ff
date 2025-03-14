function openPopup(popup) {
    popup.classList.add('popup_is-opened')

    popup.addEventListener('click', handleOverlayClose)
    document.addEventListener('keydown', handleEscapeClose)
}

function closePopup () {
    const openedPopup = document.querySelector('.popup_is-opened')

    if (openedPopup) {
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