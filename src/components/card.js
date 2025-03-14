function createCard (arrayItem, userId, handleLike, handleImage, handleDelete) {

    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikes = cardElement.querySelector('.card__like-counter');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardTitle.textContent = arrayItem.name;
    cardImage.src = arrayItem.link;
    cardImage.alt = `Фотография места: ${arrayItem.name}`;
    cardLikes.textContent = arrayItem.likes.length;

    const cardLikeButton = cardElement.querySelector('.card__like-button')

    if (arrayItem.likes.some((elem) => elem._id === userId)) {
        cardLikeButton.classList.add('card__like-button_is-active')
    }

    cardLikeButton.addEventListener('click', () => handleLike(cardLikeButton, arrayItem, cardLikes));

    cardImage.addEventListener('click', () => handleImage(arrayItem))

    if (userId === arrayItem.owner._id) {
        cardDeleteButton.addEventListener('click', () => handleDelete(cardElement, arrayItem._id));
    } else {
        cardDeleteButton.style.display = 'none';
    }
    
    return cardElement;
}

function likeCard (handleApiLike, handleApiDislike) {

    return function (likeButton, card, likeCounter) {

        if (likeButton.classList.contains('card__like-button_is-active')) {
            handleApiDislike(card)
            .then(cardData => likeCounter.textContent = cardData.likes.length)
            .then(() => likeButton.classList.toggle('card__like-button_is-active'))
            .catch(error => console.log(`Возникла ошибка: ${error}`))

        } else {
            handleApiLike(card)
            .then(cardData => likeCounter.textContent = cardData.likes.length)
            .then(() => likeButton.classList.toggle('card__like-button_is-active'))
            .catch(error => console.log(`Возникла ошибка: ${error}`))
        }
    }
}

export { createCard, likeCard };