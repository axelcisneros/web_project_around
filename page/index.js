import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormCard from "../components/FormCard.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Popup from "../components/Popup.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  popup,
  popimag,
  poptxt,
  gallery,
  validationConfig,
  formElements,
  formValidators,
  paragName,
  paragAbout,
  saveChangeEdit,
  saveCard,
  edClass,
  addClass,
  butEdit,
  butAdd,
  butImg,
  saveImgProfile,
  imgClass,
  openEditAdd,
} from "../constants/utils.js";

export const popupFormEdit = new PopupWithForm(popup, edClass, saveChangeEdit);
popupFormEdit.setEventListeners();
export const popupFormAdd = new PopupWithForm(popup, addClass, saveCard);
popupFormAdd.setEventListeners();
export const popupFormimg = new PopupWithForm(popup, imgClass, saveImgProfile);
popupFormimg.setEventListeners();
export const popupFormTrash = new PopupWithConfirmation(popup);

export const openPop = new Popup(popup);
openPop.setEventListeners();

const popupImage = new PopupWithImage(popup, popimag, poptxt);
popupImage.setEventListeners();

export const usInfo = new UserInfo({
  nameSelector: paragName,
  jobSelector: paragAbout,
});

const sectionCard = new Section(
  {
    item: initialCards,
    renderer: (item) => {
      const card = new Card(
        item,
        "#main__template",
        popupImage,
        popupFormTrash
      );
      const cardElement = card.getCreateCard();
      sectionCard.addItem(cardElement);
    },
  },
  gallery
);
sectionCard.renderer();

const formCardsAdd = (titleValue, linkValue, cardSelector) => {
  const sectionInstance = new Section(
    {
      items: [],
      renderer: (data) => {
        const formCard = new FormCard(cardSelector, popupImage, popupFormTrash);
        formCard.handleCreateCard(data.link, data.title);
        return formCard.getCreateCard();
      },
    },
    gallery
  );
  const cardData = { link: linkValue, title: titleValue };
  sectionInstance.addItem(sectionInstance._renderer(cardData));
};

formElements.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
  formValidators.push(formValidator);
});

butEdit.addEventListener("click", (e) => openEditAdd(e, openPop));
butAdd.addEventListener("click", (e) => openEditAdd(e, openPop));
butImg.addEventListener("click", (e) => openEditAdd(e, openPop));
document.addEventListener("keydown", (e) => {
  const formList = e.target.classList;
  if (e.key === "Enter" && formList.contains("form-edit")) {
    saveChangeEdit();
  } else if (e.key === "Enter" && formList.contains("form-add")) {
    saveCard();
  } else if (e.key === "Enter" && formList.contains("form-img")) {
    saveImgProfile();
  }
});

export { formCardsAdd as add };
