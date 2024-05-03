`use strict`;

// Web storage is what JavaScript API provided by browser for storing data locally and securely in the user's browser.

// sessionStorage.setItem(`color`, `green`);
// console.log(sessionStorage);

// ************************************
// ************************************

// **********************************
// building to-do list functuanility.

const input = document.getElementById(`task-input`);
const taskList = document.querySelector(`.task-list`);
const addBtn = document.getElementById(`add`);

// state variable

// Object which will store all user entered tasks.
let taskObj = {};
// unique id of object storing in session
let sessionId = sessionStorage.getItem(`num`) || 0; // setting id in storage

let tasks; // assign when page get loads
console.log(`session Id before task added:${sessionId}`);

// function to add tasks
const addTask = function (e) {
  console.log(` starting sessionId when task is added: ${sessionId}`);

  // checking if tasks object is exist when page loads.
  if (tasks) {
    console.log(`Page reload after task added!`);
    taskObj = tasks; // assign tasks object to taskObj
  }

  // *****************************
  // *** task is created *********
  const task = document.createElement(`li`);
  task.textContent = input.value;
  task.classList.add(`task`);

  // *** task is append to dom
  taskList.append(task);

  // ** task is added to task object
  taskObj[`task-${sessionId}`] = `${input.value}`;

  // task object
  console.log(`Task Object`);
  console.log(taskObj);
  // Storing all this data in the session storage and local storage in browser

  // Storing all data into the session storage.
  // storing id into session storage.
  sessionStorage.setItem(`num`, sessionId);
  // storing task object into session
  sessionStorage.setItem("myTask", JSON.stringify(taskObj));

  // getting length of session storage
  console.log(`Length of session storage: ${sessionStorage.length}`);

  // printing session storage
  console.log(`Session storage after task added:`);
  console.log(sessionStorage);
  // updating session ID
  sessionId++;

  console.log(`Session Id after got incremented!: ${sessionId}`);
};

addBtn.addEventListener(`click`, addTask);

// Page Load:-- Show all the tasks stored in the local Storage

document.addEventListener(`DOMContentLoaded`, function (e) {
  console.log(sessionStorage);
  if (sessionStorage.getItem(`myTask`)) {
    tasks = JSON.parse(sessionStorage.getItem(`myTask`));
    console.log(tasks);

    // Showing all these tasks in DOM when the page loads
    for (const key in tasks) {
      const task = document.createElement(`li`);
      task.innerHTML = tasks[key];
      task.classList.add("task");
      taskList.append(task);
    }
  }

  // when page is loaded session id got updated!
  sessionId++;
});
