const container = document.querySelector('.places__list');

function addCard(arrayItem, onDelete) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    let cardTitle = cardElement.querySelector('.card__title');
    let cardImage = cardElement.querySelector('.card__image');

    cardTitle.textContent = arrayItem.name;
    cardImage.setAttribute('src', arrayItem.link);

    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardDeleteButton.addEventListener('click', () => {
        deleteCard(cardElement);
    });

    container.append(cardElement);
}

function deleteCard(card) {
    card.remove();
}

function autoLoadCards(array) {
    for (let i = 0; i < array.length; i++) {
        addCard(array[i])
    }
}

autoLoadCards(initialCards);