const placesCardsContainer = document.querySelector('.places__list');

let placesCard;

function createCard(arrayItem, handler) {

    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardTitle = cardElement.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');

    cardTitle.textContent = arrayItem.name;

    cardImage.src = arrayItem.link;
    cardImage.alt = `Фотография места: ${cardTitle.textContent}`;

    cardDeleteButton.addEventListener('click', () => {
        handler(cardElement);
    });
    
    placesCard = cardElement;
    return placesCard;
}

function deleteCard(card) {
    card.remove();
}

initialCards.forEach(function addCard(element) {
    createCard(element, deleteCard);
    placesCardsContainer.append(placesCard);
})