import './pages/index.css'
import { initialCards } from './components/cards'
import { createCard, likeCard, deleteCard } from './components/card'
import { closePopup, openPopup  } from './components/modal'

const popupTypeImage = document.querySelector('.popup_type_image')
const openedImage = popupTypeImage.querySelector('.popup__image')
const openedImageTitle = popupTypeImage.querySelector('.popup__caption')

function openImage(item) {
        openedImage.src = item.link
        openedImage.alt = `Фотография места: ${item.name}`
        openedImageTitle.textContent = item.name

        openPopup(popupTypeImage)
}

const placesCardsContainer = document.querySelector('.places__list')

function addCard(element) {
    const cardElement = createCard(element, likeCard, openImage, deleteCard)
    placesCardsContainer.prepend(cardElement);
}

initialCards.forEach(elem => addCard(elem))

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeEditButton = document.querySelector('.profile__edit-button');

const formEditElement = document.forms['edit-profile']
const nameInput = formEditElement['name']
const jobInput = formEditElement['description']

popupTypeEditButton.addEventListener('click', () => {
    openPopup(popupTypeEdit)

    nameInput.value = nameTitle.textContent
    jobInput.value = jobDescription.textContent
})

const nameTitle = document.querySelector('.profile__title')
const jobDescription = document.querySelector('.profile__description')

function handleFormEditSubmit(evt) {
    evt.preventDefault();

    nameTitle.textContent = nameInput.value
    jobDescription.textContent = jobInput.value

    closePopup()
}

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeNewCardButton = document.querySelector('.profile__add-button');

popupTypeNewCardButton.addEventListener('click', () => {
    openPopup(popupTypeNewCard)
})

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

    formAddCardElement.reset()
    closePopup()
}

formAddCardElement.addEventListener('submit', handleFormAddCardSubmit);