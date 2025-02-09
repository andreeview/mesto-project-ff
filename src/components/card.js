function createCard(arrayItem, handleLike, handleClose) {

    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardTitle.textContent = arrayItem.name;

    cardImage.src = arrayItem.link;
    cardImage.alt = `Фотография места: ${cardTitle.textContent}`;

    cardDeleteButton.addEventListener('click', () => handleClose(cardElement));

    const cardLikeButton = cardElement.querySelector('.card__like-button')

    cardLikeButton.addEventListener('click', () => handleLike(cardLikeButton));
    
    return cardElement;
}

function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active')
}

function deleteCard(card) {
    card.remove();
}

export { createCard, likeCard, deleteCard };