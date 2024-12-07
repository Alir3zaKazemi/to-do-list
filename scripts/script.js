"use strict";

let days = document.querySelectorAll("button");

for (let i = 0; i < days.length; i++) {
	days[i].addEventListener("click", () => {
    for (let j = 0; j < days.length; j++) {
      days[j].classList.remove('button-back')
    }
		days[i].classList.add("button-back");
	});
}


