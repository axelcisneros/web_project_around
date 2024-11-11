const butEdit = document.querySelector(".main__button_edit");
const popup = document.querySelector(".popup");
const butClose = document.querySelector(".popup__button_close");
const form = document.querySelector(".popup__container");
const inName = document.querySelector(".main__paragraph_name");
const inAbout = document.querySelector(".main__paragraph_about");
const inpName = document.querySelector(".popup__input_name");
const inpAbout = document.querySelector(".popup__input_about");
function openEdit() {
  inpName.value = inName.textContent;
  inpAbout.value = inAbout.textContent;
  popup.classList.toggle("popup_opened");
}

butEdit.addEventListener("click", openEdit);
butClose.addEventListener("click", openEdit);

function saveChangeEdit(e) {
  e.preventDefault();
  inName.textContent = inpName.value;
  inAbout.textContent = inpAbout.value;
  openEdit();
}

form.addEventListener("submit", saveChangeEdit);
