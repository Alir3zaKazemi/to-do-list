"use strict";

let days = document.getElementsByClassName("weekdays-btn");
let tables = document.getElementsByTagName('table');
let addTaskBtn = document.getElementById('add-btn');
let insertedTaskText = document.getElementById("task-textarea");
let form = document.getElementById('form');


for (let i = 0; i < days.length; i++) {
	days[i].addEventListener("click", () => {
    for (let j = 0; j < days.length; j++) {
      days[j].classList.remove('button-back');
      tables[j].classList.add('hidden')
    }
		days[i].classList.add("button-back");
    tables[i].classList.remove('hidden')
	});
}

let LocalStorageValues = [];

addTaskBtn.addEventListener('click', ()=> {
  let formData = new FormData(form);
  let insertedDataObj = Object.fromEntries(formData);

  let date = Date.now();
  insertedDataObj.date = date;

  let stringData = JSON.stringify(insertedDataObj);
  LocalStorageValues.push(stringData);
  localStorage.setItem('tasks',LocalStorageValues);
})

