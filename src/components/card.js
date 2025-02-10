import { openPopup } from './modal'

function createCard(arrayItem, handleLike, handleImage, handleDelete) {

    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardTitle.textContent = arrayItem.name;

    cardImage.src = arrayItem.link;
    cardImage.alt = `Фотография места: ${cardTitle.textContent}`;

    const cardLikeButton = cardElement.querySelector('.card__like-button')
    cardLikeButton.addEventListener('click', () => handleLike(cardLikeButton));

    cardImage.addEventListener('click', () => handleImage(cardImage, cardTitle))

    cardDeleteButton.addEventListener('click', () => handleDelete(cardElement));
    
    return cardElement;
}

function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active')
}

function openImage(image, title) {
    const popupTypeImage = document.querySelector('.popup_type_image')
    const openedImage = popupTypeImage.querySelector('.popup__image')
    const openedImageTitle = popupTypeImage.querySelector('.popup__caption')

    image.addEventListener('click', () => {
        openedImage.src = image.src
        openedImage.alt = image.alt
        openedImageTitle.textContent = title.textContent
        openPopup(popupTypeImage)
    })
}

function deleteCard(card) {
    card.remove();
}

export { createCard, likeCard, openImage, deleteCard };