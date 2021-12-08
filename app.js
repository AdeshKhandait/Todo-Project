// -------------------Selector----------------------------
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// --------------------Event Listener------------------------
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deletecheck);
filterOption.addEventListener("click", filterTodo);

//------------------------ FUNCTIONS--------------------------
// addTodo function Helps to Creating todo
function addTodo(e) {
  // Preventing form from submitting
  e.preventDefault();
  // Creating the div using javascript
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // Creating the li using javascript
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // Saving the todo to local storage
  saveTodo(todoInput.value);
  // Creating Checked Mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = "<i class='fas fa-check'></i>";
  completedButton.classList.add("completed-btn");
  todoDiv.appendChild(completedButton);
  // Creating delete Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  // Adding the TodoDiv to todoList
  todoList.appendChild(todoDiv);
  // todoInput value clear
  todoInput.value = "";
}
// deleteCheck helps to creating the animating delete and complete button and deleting the todo div
function deletecheck(e) {
  const item = e.target;
  // Delete Mark button
  if (item.classList[0] === "trash-btn") {
    // e.target.parentElement.remove();
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    // Removing From Local storage
    removeTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // Check Mark button
  if (item.classList[0] === "completed-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
// // Filter Function
function filterTodo(e) {
  // grabbing the todos of all type such as completed and uncomplete
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      // selecting the all todo
      case "all":
        todo.style.display = "flex";
        break;
      // filtering the completed todo
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      // filtering the unompleted todo
      case "uncomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// Saving to local Storage
// saveTodo Fucntion helps to create the todo to local storage
function saveTodo(todo) {
  // Checking if there is already stored todo in local storage
  let todos;
  // If NO then create empty array
  if (localStorage.getItem("todos") === null) {
    todos = [];
  }
  // If YES then bring back to todo
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // Passing the todos back to todo
  todos.push(todo);
  //Saving the Todo back to local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Getting back from the local storage
// getTodos fucntion helps to bring the back todo that are stored in local storage
function getTodos() {
  let todos;
  // If NO then create empty array
  if (localStorage.getItem("todos") === null) {
    todos = [];
  }
  // If YES then bring back to todo
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // Creating the div using javascript
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Creating the li using javascript
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // todoInput value clear
    todoInput.value = "";
    // Creating Checked Mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);
    // Creating delete Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // Adding the TodoDiv to todoList
    todoList.appendChild(todoDiv);
  });
}
// Removing the todo after click on delete from local storage
// removeTodos helps to delete todo from local storage
function removeTodos(todo) {
  let todos;
  // If NO then create empty array
  if (localStorage.getItem("todos") === null) {
    todos = [];
  }
  // If YES then bring back to todo
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //Grabbing the inner text of li
  const todoIndex = todo.children[0].innerText;
  // deleting the array from local storage
  todos.splice(todos.indexOf(todoIndex), 1);
  // Updating the local Storage
  localStorage.setItem("todos", JSON.stringify(todos));
}
