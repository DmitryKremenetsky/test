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
		let isValidEmail = true;
		let isValidPassword = true;

		inputs.forEach(function (input) {
			if (input.value.trim() === "") {
				input.classList.add("error");
				hasEmptyFields = true;
			} else {
				input.classList.remove("error");
			}

			if (input.id === "email" && !validateEmail(input.value)) {
				input.classList.add("error");
				isValidEmail = false;
			}

			if (input.id === "password" && !validatePassword(input.value)) {
				input.classList.add("error");
				isValidPassword = false;
			}
		});

		if (hasEmptyFields) {
			console.log("Пожалуйста, заполните все обязательные поля.");
		} else if (!isValidEmail) {
			console.log(
				"Пожалуйста, введите действительный адрес электронной почты."
			);
		} else if (!isValidPassword) {
			console.log(
				"Пароль должен содержать минимум 8 символов, заглавные и строчные буквы, а также цифры."
			);
		} else {
			mainContent.style.display = "none";
			registrationSuccess.style.display = "block";
			console.log("Форма успешно заполнена. Можно отправить данные на сервер.");
		}
	}
});

function validateEmail(email) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
}

function validatePassword(password) {
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
	return regex.test(password);
}
