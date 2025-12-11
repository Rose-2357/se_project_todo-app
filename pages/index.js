import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const formValidator = new FormValidator(validationConfig, addTodoForm);

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const todoPopupWithForm = new PopupWithForm(
  "#add-todo-popup",
  ({ name: dataName, date: dataDate }) => {
    const name = dataName;
    const dateInput = dataDate;

    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const values = { name, date, id: uuidv4() };
    const newTodoSection = new Section({
      items: [values],
      renderer: () => {
        return new Todo(values, `#${todoTemplate.id}`, (wasCompleted) => {
          if (wasCompleted) {
            todoCounter.updateCompleted(false);
          }
        }).getView();
      },
      containerSelector: ".todos__list",
    });
    newTodoSection.renderItems();
    todoPopupWithForm.close();
    formValidator.resetValidation();
    todoCounter.updateTotal(true);
  }
);

addTodoButton.addEventListener("click", () => {
  todoPopupWithForm.open();
});

todosList.addEventListener("click", (e) => {
  if (e.target.classList.contains("todo__completed")) {
    todoCounter.updateCompleted(e.target.checked);
  }

  if (e.target.classList.contains("todo__delete-btn")) {
    todoCounter.updateTotal(false);
  }
});

const initialTodoList = new Section({
  items: initialTodos,
  renderer: (item) => {
    return new Todo(item, `#${todoTemplate.id}`, (wasCompleted) => {
      if (wasCompleted) {
        todoCounter.updateCompleted(false);
      }
    }).getView();
  },
  containerSelector: ".todos__list",
});

initialTodoList.renderItems();

formValidator.enableValidation();
