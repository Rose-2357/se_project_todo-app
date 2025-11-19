export default class Todo {
  constructor(data, selector) {
    this._data = data;
    this._selector = selector;
    this._element = document
      .querySelector(selector)
      .content.querySelector(".todo")
      .cloneNode(true);
    this._nameEl = this._element.querySelector(".todo__name");
    this._checkboxEl = this._element.querySelector(".todo__completed");
    this._label = this._element.querySelector(".todo__label");
    this._date = this._element.querySelector(".todo__date");
    this._deleteBtn = this._element.querySelector(".todo__delete-btn");
  }

  _setEventListeners() {
    this._deleteBtn.addEventListener("click", () => {
      this._element.remove();
    });
  }

  getView() {
    this._setEventListeners();
    this._nameEl.textContent = this._data.name;
    this._checkboxEl.checked = this._data.completed;
    this._checkboxEl.id = `todo-${this._data.id}`;
    this._label.setAttribute("for", `todo-${this._data.id}`);

    this._dueDate = new Date(this._data.date);
    if (!isNaN(this._dueDate)) {
      this._date.textContent = `Due: ${new Date(
        this._dueDate
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    return this._element;
  }
}
