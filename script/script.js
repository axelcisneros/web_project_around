let butEdit = document.querySelector(".main__button_edit");
let popup = document.querySelector(".popup");
let butClose = document.querySelector(".popup__button_close");
let butLike = document.querySelector(".main__button_like");

function openEdit() {
  popup.classList.toggle("popup_opened");
}

butEdit.addEventListener("click", openEdit);
butClose.addEventListener("click", openEdit);
