const mainContent = document.getElementById("mainContent");
const registrationSuccess = document.getElementById("registrationSuccess");
const registrationForm = document.getElementById("registrationForm");
const confirmButton = document.getElementById("confirmButton");

document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("registrationForm");

	confirmButton.addEventListener("click", function (event) {
		event.preventDefault();
		checkFormFields();
	});

	function checkFormFields() {
		const inputs = form.querySelectorAll("input");
		let hasEmptyFields = false;

		inputs.forEach(function (input) {
			if (input.value.trim() === "") {
				input.classList.add("error");
				hasEmptyFields = true;
			} else {
				input.classList.remove("error");
			}
		});

		if (hasEmptyFields) {
			console.log("Пожалуйста, заполните все обязательные поля.");
		} else {
			mainContent.style.display = "none";
			registrationSuccess.style.display = "block";
			console.log("Форма успешно заполнена. Можно отправить данные на сервер.");
		}
	}
});
