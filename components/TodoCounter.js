export default class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
  }
}
