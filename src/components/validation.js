function showInputError (formElement, inputElement, errorMessage, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
};

function hideInputError (formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
};

function disableSubmitButton (buttonElement, validationConfig) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
}

function clearValidation (formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    inputList.forEach(inputElement => {
        hideInputError(formElement, inputElement, validationConfig);
    })

    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    disableSubmitButton(buttonElement, validationConfig);
}

function checkInputValidity (formElement, inputElement, validationConfig) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }


    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideInputError(formElement, inputElement, validationConfig);
    }
};

function hasInvalidInput (inputList) {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    })
};

function toggleSubmitButtonState (inputList, buttonElement, validationConfig) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
};

function setValidationEventListeners (formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    toggleSubmitButtonState(inputList, buttonElement, validationConfig);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, validationConfig);
            toggleSubmitButtonState(inputList, buttonElement, validationConfig);
        })
    })
};

function enableValidation (validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach(formElement => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        })

        setValidationEventListeners(formElement, validationConfig);
    })
};

export { enableValidation, clearValidation };