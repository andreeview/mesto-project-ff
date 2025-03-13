import './pages/index.css'
import { createCard, likeCard } from './components/card'
import { closePopup, openPopup  } from './components/modal'
import { enableValidation, clearValidation } from './components/validation'
import { apiGetUserInfo, apiGetInitialCards, apiReplaceProfileInfo, apiAddNewCard, apiDeleteCard, apiAddLike, apiRemoveLike, apiReplaceProfileImage } from './components/api';

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

const popupTypeImage = document.querySelector('.popup_type_image')
const openedImage = popupTypeImage.querySelector('.popup__image')
const openedImageTitle = popupTypeImage.querySelector('.popup__caption')

function openImage (item) {
        openedImage.src = item.link
        openedImage.alt = `Фотография места: ${item.name}`
        openedImageTitle.textContent = item.name

        openPopup(popupTypeImage)
}

const popupTypeDeleteConfirm = document.querySelector('.popup_type_delete-confirm');

function deleteConfirm (item, itemId) {
    function deleteCard () {
        item.remove();
        apiDeleteCard(itemId);
        closePopup();
        deleteConfirmButton.removeEventListener('click', deleteCard)
    }

    const deleteConfirmButton = popupTypeDeleteConfirm.querySelector('.popup__button');
    deleteConfirmButton.addEventListener('click', deleteCard)
    openPopup(popupTypeDeleteConfirm);
}

const placesCardsContainer = document.querySelector('.places__list')

function addCard (element) {
    const cardElement = createCard(element, userId, likeCard(apiAddLike, apiRemoveLike), openImage, deleteConfirm);
    placesCardsContainer.prepend(cardElement);
}

const nameTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const profileImage = document.querySelector('.profile__image')

let userId = null;

Promise.all([apiGetUserInfo(), apiGetInitialCards()])
    .then(result => {
        const userData = result[0];
        const cardsData = result[1];

        userId = userData._id
        nameTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style['background-image'] = `url('${userData.avatar}')`;

        cardsData.reverse().forEach(elem => addCard(elem));
    })
    .catch(error => console.log(`Возникла ошибка: ${error}`))

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeEditButton = document.querySelector('.profile__edit-button');

const formEditElement = document.forms['edit-profile'];
const nameInput = formEditElement['name'];
const descriptionInput = formEditElement['description'];
const submitButtonFormEditElement = formEditElement.querySelector('.popup__button');

popupTypeEditButton.addEventListener('click', () => {
    openPopup(popupTypeEdit);

    nameInput.value = nameTitle.textContent;
    descriptionInput.value = profileDescription.textContent;

    clearValidation(formEditElement, validationConfig);
})

function handleFormEditSubmit (evt) {
    evt.preventDefault();
    toggleLoadState(true, submitButtonFormEditElement);

    nameTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    apiReplaceProfileInfo(nameInput.value, descriptionInput.value)
        .catch(error => console.log(`Возникла ошибка: ${error}`))
        .finally(() => toggleLoadState(false, submitButtonFormEditElement))

    closePopup()
}

formEditElement.addEventListener('submit', handleFormEditSubmit);

const popupTypeReplaceAvatar = document.querySelector('.popup_type_replace-avatar');

const formNewAvatar = document.forms['new-avatar'];
const avatarLinkInput = formNewAvatar['link'];
const submitButtonFormNewAvatar = formNewAvatar.querySelector('.popup__button');

profileImage.addEventListener('click', () => {
    openPopup(popupTypeReplaceAvatar);
})

function handleFormNewAvatar (evt) {
    evt.preventDefault();
    toggleLoadState(true, submitButtonFormNewAvatar)

    profileImage.style['background-image'] = `url('${avatarLinkInput.value}')`;
    apiReplaceProfileImage(avatarLinkInput.value)
        .catch(error => console.log(`Возникла ошибка: ${error}`))
        .finally(() => toggleLoadState(false, submitButtonFormNewAvatar))

    formNewAvatar.reset()
    clearValidation(formNewAvatar, validationConfig);

    closePopup()
}

formNewAvatar.addEventListener('submit', handleFormNewAvatar);

const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeNewCardButton = document.querySelector('.profile__add-button');

popupTypeNewCardButton.addEventListener('click', () => {
    openPopup(popupTypeNewCard);
})

const formAddCardElement = document.forms['new-place'];
const cardNameInput = formAddCardElement['place-name'];
const cardLinkInput = formAddCardElement['link'];
const submitButtonFormAddCardElement = formAddCardElement.querySelector('.popup__button');

function handleFormAddCardSubmit (evt) {
    evt.preventDefault();
    toggleLoadState(true, submitButtonFormAddCardElement);

    apiAddNewCard(cardNameInput.value, cardLinkInput.value)
        .then(result => addCard(result))
        .catch(error => console.log(`Возникла ошибка: ${error}`))
        .finally(() => toggleLoadState(false, submitButtonFormAddCardElement))

    formAddCardElement.reset();
    clearValidation(formAddCardElement, validationConfig);

    closePopup();
}

formAddCardElement.addEventListener('submit', handleFormAddCardSubmit);

function toggleLoadState (isPending, button) {
    if (isPending) {
        button.textContent = 'Сохранение...';
    } else {
        button.textContent = 'Сохранить';
    }
}

enableValidation(validationConfig);