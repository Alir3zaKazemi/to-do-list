"use strict";

let days = document.getElementsByClassName("weekdays-btn");
let tables = document.getElementsByTagName("TABLE");
let addTaskBtn = document.getElementById("add-btn");
let insertedTaskText = document.getElementById("task-textarea");
let form = document.getElementById("form");
let clearLocal = document.getElementById("clear");

clearLocal.addEventListener("click", () => {
	localStorage.clear();
	location.reload(true);
});

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

addTaskBtn.addEventListener("click", () => {
	const LocalStorageValues = JSON.parse(localStorage.getItem("tasks") || "[]");
	let formData = new FormData(form);
	let objFormData = Object.fromEntries(formData);
	let date = Date.now();
	objFormData.id = date.toString();
	objFormData.isDone = objFormData.isDone ? true : false;
	LocalStorageValues.push(objFormData);
	localStorage.setItem("tasks", JSON.stringify(LocalStorageValues));
	showTask();
	form.reset();
});

let localData;
let tableRow;

function showTask() {
	localData = JSON.parse(localStorage.getItem("tasks") || "[]");

	for (let x = 0; x < tables.length; x++) {
		tables[x].children[1].innerHTML = "";
	}

	for (let i = 0; i < tables.length; i++) {
		for (let element of localData) {
			if (tables[i].className.includes(`${element.dayInWeek}`)) {
				tables[i].children[1].innerHTML += `<tr><th scope="row">${
					element.id
				}</th><td colspan="3" class="task-main">${
					element.taskDescription
				}</td><td colspan="1" class="check-cell"><input type="checkbox" name="done" id="doneCheck" ${
					element.isDone == true ? "checked" : null
				}></td><td colspan="1" class="check-cell"><button data-id="${
					element.id
				}" id="del-button" class="del-button">delete</button><button data-id="${
					element.id
				}" id="edit-button" class="edit-button" onclick="editTask()">Edit</button></td></tr>`;
			}
		}
	}

	if (localData.length > 0) {
		let deleteTaskButton = document.getElementsByClassName("del-button");
		for (let i = 0; i <= deleteTaskButton.length; i++) {
			deleteTaskButton?.[i]?.addEventListener("click", (e) => {
				const deletingItemId = e.target.dataset.id;
				const newLocalData = localData.filter((task) => {
					return task.id != deletingItemId;
				});
				localStorage.setItem("tasks", JSON.stringify(newLocalData));
				showTask();
			});
		}
	}
}


function editTask() {
	let editTaskButton = document.getElementsByClassName("edit-button");
	for (let j = 0; j < editTaskButton.length; j++) {
		editTaskButton?.[j]?.addEventListener("click", (e) => {
			let newTaskDescription = prompt("Edit task Description:", "nothing");
			let editingTaskId = e.target.dataset.id;
			let editedLocalData = localData.map((task) => {
				if (task.id == editingTaskId) {
					task.taskDescription = newTaskDescription;
				}
				return task;
			});
			localStorage.setItem("tasks", JSON.stringify(editedLocalData));
			showTask();
		});
	}
}

showTask();