const butEdit = document.querySelector(".main__button_edit");
const butadd = document.querySelector(".main__button__add");
const butClose = document.querySelector(".popup__button_close");
const butSave = document.querySelector(".popup__button_save");
const popup = document.querySelector(".popup");
const form = document.querySelector(".popup__container");
const gallery = document.querySelector(".main__gallery");
const inName = document.querySelector(".main__paragraph_name");
const inAbout = document.querySelector(".main__paragraph_about");
const inpName = document.querySelector(".popup__input_name");
const inpAbout = document.querySelector(".popup__input_about");
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "./images/valle-yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "./images/lago-louise.png",
  },
  {
    name: "Montañas Calvas",
    link: "./images/montañas-calvas.png",
  },
  {
    name: "Latemar",
    link: "./images/latemar.png",
  },
  {
    name: "Vanois National Park",
    link: "./images/vanois-national-park.png",
  },
  {
    name: "Lago di Braies",
    link: "./images/lago-braies.png",
  },
];

function openEdit() {
  inpName.value = inName.textContent;
  inpAbout.value = inAbout.textContent;
  popup.classList.toggle("popup_opened");
}

function close() {
  popup.classList.toggle("popup_opened");
}

butEdit.addEventListener("click", openEdit);
butClose.addEventListener("click", close);

function saveChangeEdit(e) {
  e.preventDefault();
  inName.textContent = inpName.value;
  inAbout.textContent = inpAbout.value;
  close();
}

form.addEventListener("submit", saveChangeEdit);

function cards() {
  initialCards.forEach((item) => {
    const cardTemplate = document.querySelector("#main__template").content;
    const cardElement = cardTemplate
      .querySelector(".main__gallery-card")
      .cloneNode(true);
    cardElement.querySelector(".main__gallery-image").src = item.link;
    cardElement.querySelector(".main__gallery-image").alt = item.name;
    cardElement.querySelector(".main__gallery-paragraph").textContent =
      item.name;
    cardElement
      .querySelector(".main__button_like")
      .addEventListener("click", function (e) {
        e.target.classList.toggle("main__button_like_active");
      });
    cardElement
      .querySelector(".main__button_trash")
      .addEventListener("click", function () {
        cardElement.remove();
      });
    gallery.append(cardElement);
  });
}
cards();
