const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

const showError = (input, message) => {
const formInput = input.parentElement;
formInput.className = "formInput error";
const small = formInput.querySelector("small");
small.innerText = message;
};

const showSucces = input => {
const formInput = input.parentElement;
formInput.className = "formInput succes";
};

const checkLength = (input, min, max) => {
    if (input.value.trim().length < min && input.value.trim().length > 0) {
        showError(input, `${input.id} must have at least ${min}`)
    } else if (input.value.trim().length >= max){
        showError(input, `${input.id} must have max ${max} characters`)
    } else {
        showSucces(input);
    }
}

const checkInput = arrayInputs => {
    arrayInputs.forEach(input => {
        if (input.value.trim() !== ""){
            if (input.id === "username") {
                checkLength(input, 3, 10);
            } else if (input.id === "password") {
                checkLength(input, 6, 15);
            } else {
                showSucces(input);
            }
            
        } else {
            showError(input, `${input.id} is required!`)
        }
    })
};

const checkEmail = input => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(input.value).toLowerCase())) {
        showSucces(input);
    } else {
        showError(input, `Email not valid`);
    }
};

const checkPasswordsMatch = (input1, input2) => {
if (input1.value !== input2.value) {
    showError(input2, `Passwords do not match!`)
};
}

form.addEventListener("submit", function(e){
e.preventDefault();
checkInput([username,email,password,password2]);
checkEmail(email);
checkPasswordsMatch(password,password2);
});