const todoListKey = "todoList";

let todoList = JSON.parse(localStorage.getItem(todoListKey)) || [];

const firstSec = document.getElementById("sec1");
const secondSec = document.getElementById("sec2");
const thirdSec = document.getElementById("sec3");
const fourthSec = document.getElementById("sec4");
const add = document.getElementById("add");
const name = document.getElementById("taskName");
const date = document.getElementById("dateValue");
const priority = document.getElementById("prioritySel");
const comp = document.getElementById("comp");

function display() {
  secondSec.innerHTML = "<h2>Today’s TodoList</h2>";
  thirdSec.innerHTML = "<h2>Future TodoList</h2>";
  fourthSec.innerHTML = "<h2>Completed Tasks</h2>";
  let count1 = 1;
  let count2 = 1;
  let count3 = 1;
  const today = formatDate(new Date());

  for (let i = 0; i < todoList.length; i++) {
    const temp = todoList[i];
    if (!temp.completed && compareDates(today, temp.date) === 0) {
      const todoDiv = createTodoElement(temp, count1);
      secondSec.appendChild(todoDiv);
      count1++;
    } else if (!temp.completed && compareDates(today, temp.date) === -1) {
      const todoDiv = createTodoElement(temp, count2);
      thirdSec.appendChild(todoDiv);
      count2++;
    } else if (temp.completed) {
      const todoDiv = createTodoElement(temp, count3, false);
      fourthSec.appendChild(todoDiv);
      count3++;
    }
  }
}

function createTodoElement(todo, count, i = true) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add(i ? "todo" : "todo1");
  todoDiv.innerHTML = i
    ? `
    <p>${count}. ${todo.name}</p>
    <p>${todo.date}</p>
    <p>Priority: ${todo.priority}</p>
    <div>
      <img src="./asset/check-circle 1.svg" class="img1" onclick="compInx(${todoList.indexOf(
        todo
      )})" />
      <img src="./asset/trash 1.svg" class="img1" onclick="deleteInx(${todoList.indexOf(
        todo
      )})" />
    </div>
  `
    : `
  <p>${count}. ${todo.name}</p>
  <p>${todo.date}</p>
  <p>Priority: ${todo.priority}</p>
  <div>
    
    <img src="./asset/trash 1.svg" class="img1" onclick="deleteInx(${todoList.indexOf(
      todo
    )})"/>
  </div>
`;
  return todoDiv;
}

document.addEventListener("DOMContentLoaded", () => {
  display();
});

add.addEventListener("click", () => {
  console.log(name.value);
  if (name.value && date.value && priority.value) {
    let name1 = name.value;
    let date1 = formatDate(date.value);
    let priority1 = priority.value;

    let temp = {
      name: name1,
      date: date1,
      priority: priority1,
      completed: false,
    };
    todoList.push(temp);
    saveTodoList();
  }
  display();
});

function saveTodoList() {
  localStorage.setItem(todoListKey, JSON.stringify(todoList));
}

function formatDate(date) {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}
function parseDate(dateString) {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}
function compareDates(dateString1, dateString2) {
  const date1 = parseDate(dateString1).getTime();
  const date2 = parseDate(dateString2).getTime();
  if (date1 === date2) return 0;
  else if (date1 < date2) return -1;
  else return 1;
}

function deleteInx(index) {
  console.log("hi", index);
  todoList.splice(index, 1);
  saveTodoList();
  display();
}

function compInx(index) {
  todoList[index].completed = true;
  saveTodoList();
  display();
}
