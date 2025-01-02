export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }
  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }
  async setUserInfo(data) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }
  async addCard(data) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }
  async removeCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }
  async likeCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }
  async removeLike(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }
  async updateAvatar(data) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
    if (res.ok) {
      return res.json();
    }
    return await Promise.reject(`Error: ${res.status}`);
  }
}
