"use strict";

let days = document.getElementsByClassName("weekdays-btn");
let tables = document.getElementsByTagName("TABLE");
let addTaskBtn = document.getElementById("add-btn");
let insertedTaskText = document.getElementById("task-textarea");
let form = document.getElementById("form");

for (let i = 0; i < days.length; i++) {
	days[i].addEventListener("click", () => {
		for (let j = 0; j < days.length; j++) {
			days[j].classList.remove("button-back");
			tables[j].classList.add("hidden");
		}
		days[i].classList.add("button-back");
		tables[i].classList.remove("hidden");
	});
}

let LocalStorageValues = [];

addTaskBtn.addEventListener("click", () => {
	let formData = new FormData(form);
	let objFormData = Object.fromEntries(formData);
	let date = Date.now();
	objFormData.id = date.toString();
	objFormData.isDone = objFormData.isDone ? true : false;
	LocalStorageValues.push(objFormData);
	localStorage.setItem("tasks", JSON.stringify(LocalStorageValues));
	showTask();
});

let localData = [];
let tableRow;

function showTask() {
	localData = JSON.parse(localStorage.getItem("tasks"));
	for (let i = 0; i < tables.length; i++) {
		for (const element of localData) {
			if (tables[i].className.includes(`${element.dayInWeek}`)) {
				tables[
					i
				].children[1].innerHTML = `<tr><th scope="row">1</th><td colspan="3" class="task-main">${
					element.taskDescription
				}</td><td colspan="1" class="check-cell"><input type="checkbox" name="done" id="" ${
					element.isDone == true ? "checked" : null
				}></td><td colspan="1" class="check-cell"><input type="checkbox" name="delete" id=""></td></tr>
  `;
			}
		}
	}
}
showTask();
