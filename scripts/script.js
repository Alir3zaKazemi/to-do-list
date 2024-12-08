"use strict";

let days = document.getElementsByClassName("weekdays-btn");
let tables = document.getElementsByTagName("table");
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
	let stringData = JSON.stringify(objFormData);
	LocalStorageValues.push(stringData);
	localStorage.setItem("tasks", JSON.stringify(LocalStorageValues));
	createTask();
});

function createTask() {
	let parsedFormData = JSON.parse(localStorage.getItem("tasks"));

	for (let i = 0; i < parsedFormData.length; i++) {
		parsedFormData[i] = JSON.parse(parsedFormData[i]);
	}

	let desiredObj = parsedFormData.filter(
		(param) => (param.id = parsedFormData[parsedFormData.length - 1].id)
	);
  
	let targetTable = document.getElementsByClassName(
		`${desiredObj[desiredObj.length - 1].dayInWeek}`
	)[0];

	let targetTableBody = targetTable.getElementsByTagName("tbody")[0];

	targetTableBody.insertAdjacentHTML(
		"beforeend",
		`<tr><th scope="row">1</th><td colspan="3" class="task-main">${
			desiredObj[desiredObj.length - 1].taskDescription
		}</td><td colspan="1" class="check-cell"><input type="checkbox" name="done" id="" ${
			desiredObj[desiredObj.length - 1].isDone == true ? "checked" : null
		}></td><td colspan="1" class="check-cell"><input type="checkbox" name="delete" id=""></td></tr>
  `
	);
	return;
}
