export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    this._handleEscapeClose();
  }

  close() {
    document.removeEventListener("keydown", this._handleKeydown);
    this._popupElement.classList.remove("popup_visible");
  }

  _handleEscapeClose() {
    document.addEventListener("keydown", this._handleKeydown);
  }

  _handleKeydown(e) {
    if (e.key === "Escape") {
      document
        .querySelector(".popup_visible")
        .classList.remove("popup_visible");
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("popup") ||
        e.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}
