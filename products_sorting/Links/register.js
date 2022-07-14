let registerLogin = document.querySelector('.registerLogin');
let registerPassword = document.querySelector('.registerPassword');
let registerPasswordAgain = document.querySelector('.registerPasswordAgain');
let registerButton = document.querySelector('.registerButtons button');


function User() {
    this.login = '',
    this.password = ''
}

registerButton.addEventListener('click', () => {
    let storageData = localStorage.getItem('user');
    if(!storageData) {
        addRegisterData();
        clearInputs();
        return
    } else {
        alert("Вы уже зарегистрированы")
    }
})

function clearInputs() {
    registerLogin.value = "";
    registerPassword.value = "";
    registerPasswordAgain.value = "";
}

function addRegisterData() {
    let registerData = new User();
    registerData.login = registerLogin.value;
    if(registerPassword.value === registerPasswordAgain.value) {
        registerData.password = registerPassword.value;
        addToLocalStorage(registerData);
        alert("Ипровизировання регистрация в localStorage успешна :)")
    } else {
        alert("Введите повторно пароль правильно");
        localStorage.removeItem('user');   
    }
    
    console.log(registerData);
}

function addToLocalStorage(data) {
    localStorage.setItem('user', JSON.stringify(data));
}
