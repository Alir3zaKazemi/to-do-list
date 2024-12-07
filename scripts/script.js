"use strict";

let days = document.getElementsByClassName("btn");
let tables = document.getElementsByTagName('table');

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


