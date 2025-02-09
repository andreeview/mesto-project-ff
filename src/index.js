import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard, likeCard, deleteCard } from './components/card';
import { openImage, turnOnPopup, closePopup, openPopup  } from './components/modal';

const placesCardsContainer = document.querySelector('.places__list');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeEditButton = document.querySelector('.profile__edit-button');

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeNewCardButton = document.querySelector('.profile__add-button');

const popupTypeImage = document.querySelector('.popup_type_image');

function addCard(element) {
    const cardElement = createCard(element, likeCard, deleteCard);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title')

    openImage(popupTypeImage, cardImage, cardTitle);
    placesCardsContainer.prepend(cardElement);
}

initialCards.forEach(elem => addCard(elem))

turnOnPopup(popupTypeEdit, popupTypeEditButton)
turnOnPopup(popupTypeNewCard, popupTypeNewCardButton)

const formEditElement = document.forms['edit-profile']

const nameInput = formEditElement['name']
const jobInput = formEditElement['description']

const nameTitle = document.querySelector('.profile__title')
const jobDescription = document.querySelector('.profile__description')

nameInput.value = nameTitle.textContent
jobInput.value = jobDescription.textContent

function handleFormEditSubmit(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value
    const jobValue = jobInput.value

    nameTitle.textContent = nameValue
    jobDescription.textContent = jobValue

    closePopup(popupTypeEdit)
}

formEditElement.addEventListener('submit', handleFormEditSubmit);

const formAddCardElement = document.forms['new-place']

const cardNameInput = formAddCardElement['place-name']
const cardLinkInput = formAddCardElement['link']

function handleFormAddCardSubmit(evt) {
    evt.preventDefault();

    const newCard = {}

    newCard.name = cardNameInput.value
    newCard.link = cardLinkInput.value

    addCard(newCard)

    cardNameInput.value = ''
    cardLinkInput.value = ''
    closePopup(popupTypeEdit)
}

formAddCardElement.addEventListener('submit', handleFormAddCardSubmit);