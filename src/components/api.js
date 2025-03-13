const apiConfig = {
    url: 'https://nomoreparties.co/v1/wff-cohort-31',
    headers: {
      authorization: '52cf44a8-e6f4-407b-a42f-945169c795f2',
      'Content-Type': 'application/json'
    }
}

function apiHandleResponse (response) {
    if (!response.ok) {
        return Promise.reject(`Возникла ошибка: ${response.status}`);
    }

    return response.json();
}

function apiRequest (path, method, bodyData) {
    if (bodyData) {
        return fetch(apiConfig.url + path, {
            method,
            headers: apiConfig.headers,
            body: JSON.stringify(bodyData),
          })
            .then(apiHandleResponse);
    }

    return fetch(apiConfig.url + path, {
      method,
      headers: apiConfig.headers
    })
        .then(apiHandleResponse);
  }

function apiGetUserInfo () {
    return apiRequest('/users/me', 'GET');
}

function apiGetInitialCards () {
    return apiRequest('/cards', 'GET');
}

function apiReplaceProfileInfo (newName, newDescription) {
    return apiRequest('/users/me', 'PATCH', {
        name: newName,
        about: newDescription
    });
}

function apiAddNewCard (cardName, cardLink) {
    return apiRequest('/cards', 'POST', {
        name: cardName,
        link: cardLink
    });
}

function apiDeleteCard (cardId) {
    return apiRequest('/cards/' + cardId, 'DELETE');
}

function apiAddLike (cardItem) {
    return apiRequest('/cards/likes/' + cardItem._id, 'PUT');
}

function apiRemoveLike (cardItem) {
    return apiRequest('/cards/likes/' + cardItem._id, 'DELETE');
}

function apiReplaceProfileImage (newLink) {
    return apiRequest('/users/me/avatar', 'PATCH', {
        avatar: newLink
    });
}

export { apiGetUserInfo, apiGetInitialCards, apiReplaceProfileInfo, apiAddNewCard, apiDeleteCard, apiAddLike, apiRemoveLike, apiReplaceProfileImage };