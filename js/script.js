"use strict";

// AJAX => Asyncron JavaScript and XML
let firstval = document.getElementById("valut1");
let secondVal = document.getElementById("valut2");
const firstIn= document.querySelector("#firstInput");
const secondIn = document.querySelector("#secondInput");
const btn = document.querySelector(".btn");

firstIn.addEventListener("input", (e) => {
	const request = new XMLHttpRequest(); // XHR
	
	// 1) method, 2) url, 3) async, 4) username, 5) password
	request.open("GET", "./db/data.json");
	request.setRequestHeader("content-type", "application/json");
	request.send();

	// status, statusText, response, readyState
	request.addEventListener("readystatechange", () => {
		let text1 = firstval.value;
		let text2 = secondVal.value;
		if (request.readyState === 4 && request.status === 200) {
			const data = JSON.parse(request.response);
			secondIn.value = (
				parseFloat(e.target.value) / parseFloat(data[text1][text2])
			).toFixed(2);
		}
	});
});

secondIn.addEventListener("input", function () {
	const request = new XMLHttpRequest();
	request.open("GET", "./db/data.json");
	request.setRequestHeader("content-type", "application/json");
	request.send();

	request.addEventListener("load", () => {
		let text1 = firstval.value;
		let text2 = secondVal.value;
		if (request.status === 200) {
			const data = JSON.parse(request.response);

			firstIn.value = (
				parseFloat(data[text1][text2]) * parseFloat(this.value)
			).toFixed(2);
			
		}
	});
});


document.addEventListener("click", (e)=>{
	firstIn.value = "";
	secondIn.value = "";
});

btn.addEventListener("click", ()=>{
	let key = firstval.value;
	firstval.value = secondVal.value;
	secondVal.value = key;
});
