import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._formElement = this._popupElement.querySelector(".popup__form");
    this.setEventListeners();
  }

  _getInputValues() {
    const inputsObject = {};
    Array.from(this._popupElement.querySelectorAll(".popup__input")).forEach(
      (input) => {
        inputsObject[`${input.name}`] = input.value;
      }
    );
    return inputsObject;
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("A");
      this._submitHandler(this._getInputValues());
    });
    super.setEventListeners();
  }
}
