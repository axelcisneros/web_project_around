import { butTrash } from "../constants/utils.js";

export default class Card {
  constructor(data, cardSelector, handleCardClick, handleCardDelete) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._popupImage = handleCardClick;
    this._handleCardDelete = handleCardDelete;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".main__gallery-card")
      .cloneNode(true);

    return cardElement;
  }

  _like() {
    this._element
      .querySelector(".main__button_like")
      .addEventListener("click", (e) => {
        e.target.classList.toggle("main__button_like_active");
      });
  }

  _trash() {
    this._element
      .querySelector(".main__button_trash")
      .addEventListener("click", () => {
        this._handleCardDelete.open();
        butTrash.addEventListener("click", () => {
          this._element.remove();
          this._handleCardDelete.close();
        });
      });
  }

  _handleCardClick() {
    this._element
      .querySelector(".main__gallery-image")
      .addEventListener("click", () => {
        this._popupImage.open(this._link, this._name);
      });
  }

  _setEventsListener() {
    this._like();
    this._trash();
    this._handleCardClick();
  }

  getCreateCard() {
    this._element = this._getTemplate();
    this._setEventsListener();

    this._element.querySelector(".main__gallery-image").src = this._link;
    this._element.querySelector(".main__gallery-image").alt = this._link;
    this._element.querySelector(".main__gallery-paragraph").textContent =
      this._name;

    return this._element;
  }
}
