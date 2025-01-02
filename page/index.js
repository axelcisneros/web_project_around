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
  popup,
  popimag,
  poptxt,
  gallery,
  validationConfig,
  formElements,
  formValidators,
  paragName,
  paragAbout,
  profImg,
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
  inpTitle,
  inpUrl,
  inpName,
  inpAbout,
  inpImg,
} from "../constants/utils.js";

export const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "8dc55ea1-4d52-4586-8203-01d2d9a48ea4",
    "Content-Type": "application/json",
  },
});

export const popupFormEdit = new PopupWithForm(popup, edClass, () => {
  saveChangeEdit(inpName.value, inpAbout.value);
});
popupFormEdit.setEventListeners();
export const popupFormAdd = new PopupWithForm(popup, addClass, () => {
  saveCard(inpTitle.value, inpUrl.value);
});
popupFormAdd.setEventListeners();
export const popupFormimg = new PopupWithForm(popup, imgClass, () => {
  saveImgProfile(inpImg.value);
});
popupFormimg.setEventListeners();
export const popupFormTrash = new PopupWithConfirmation(popup);

export const openPop = new Popup(popup);
openPop.setEventListeners();

const popupImage = new PopupWithImage(popup, popimag, poptxt);
popupImage.setEventListeners();

export const usInfo = new UserInfo({
  nameSelector: paragName,
  jobSelector: paragAbout,
  avatarSelector: profImg,
});

api
  .getUserInfoAndCards()
  .then(({ userInfo, cards }) => {
    usInfo.setUserInfo({ name: userInfo.name, job: userInfo.about });
    usInfo.setAvatar({ avatar: userInfo.avatar });

    const sectionCard = new Section(
      {
        item: cards,
        renderer: (item) => {
          const card = new Card(
            item,
            "#main__template",
            popupImage,
            popupFormTrash,
            api
          );
          const cardElement = card.getCreateCard();
          sectionCard.addItem(cardElement);
        },
      },
      gallery
    );
    sectionCard.renderer();
  })
  .catch((err) => {
    console.log(err);
  });

export const formCardsAdd = (titleValue, linkValue, cardSelector) => {
  const sectionFormCard = new Section(
    {
      items: [],
      renderer: (data) => {
        const formCard = new FormCard(
          cardSelector,
          popupImage,
          popupFormTrash,
          api
        );
        formCard.handleCreateCard(data.link, data.name, data._id);
        return formCard.getCreateCard();
      },
    },
    gallery
  );
  const cardData = { name: titleValue, link: linkValue };
  api
    .addCard(cardData)
    .then((res) => {
      sectionFormCard.addItem(sectionFormCard._renderer(res));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const formInfoEdit = (nameValue, aboutValue) => {
  api
    .setUserInfo({ name: nameValue, about: aboutValue })
    .then((data) => {
      usInfo.setUserInfo({ name: data.name, job: data.about });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const formImgProfile = (avatarValue) => {
  api
    .updateAvatar({ avatar: avatarValue })
    .then((data) => {
      usInfo.setAvatar({ avatar: data.avatar });
    })
    .catch((err) => {
      console.log(err);
    });
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
