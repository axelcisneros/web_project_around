import Card from "./Card.js";

export default class FormCard extends Card {
  constructor(cardSelector, handleCardClick, handleCardDelete) {
    super({}, cardSelector, handleCardClick, handleCardDelete);
  }
  handleCreateCard(link, title) {
    this._name = title;
    this._link = link;
  }
}
