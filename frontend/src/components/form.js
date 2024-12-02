import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {Auth} from "../services/auth.js";

export class Form {
    constructor(page) {
        this.processElement = null;
        this.page = page;

        this.fields = [
            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                valid: false,
            },
            {
                name: 'password',
                id: 'password',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false,
            },

        ];

        if (this.page === 'signup') {
            this.fields.unshift(
                {
                    name: 'name',
                    id: 'name',
                    element: null,
                    regex: /([А-ЯЁ][а-яё]+[\-\s]?){3,}/,
                    valid: false,
                },

                {
                    name: 'repeat-password',
                    id: 'repeat-password',
                    element: null,
                    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                    valid: false,
                },
                );
        }

        const that = this;

        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.onchange = function () {
                that.validateField.call(that, item, this)
            }
        })

        this.processElement = document.getElementById('process');
        this.processElement.onclick = function () {
            that.processForm();
        }


        if (this.page === 'login') {
            this.rememberElement = document.getElementById('remember');
            this.rememberElement.onchange = function () {
                that.validateForm();
            }
        }

    }

    validateField(field, element) {
        if (!element.value || !element.value.match(field.regex) ) {
            element.style.borderColor = 'red';
            element.nextElementSibling.style.display = 'flex';
            element.parentElement.style.marginBottom = '50px';
            field.valid = false;
        }
        else {
            element.removeAttribute('style');
            element.nextElementSibling.style.display = 'none';
            element.parentElement.style.marginBottom = '10px';
            field.valid = true;
        }
        this.validateForm();
    }

    validateForm() {
        const validForm = this.fields.every(item => item.valid);
        const isValid = this.rememberElement ? this.rememberElement.checked && validForm : validForm;
        if (isValid) {
            this.processElement.removeAttribute('disabled');
        } else {
            this.processElement.setAttribute('disabled', 'disabled');
        }
        return isValid;
    }


    async processForm() {
        if (this.validateForm()) {
            if (this.page === 'signup') {
                try {
                    const result = await CustomHttp.request(config.host + '/signup', "POST", {
                        name: this.fields.find(item => item.name === 'name').element.value,
                        lastName: this.fields.find(item => item.name === 'name').element.value.trim().split(" ")[0],
                        email: this.fields.find(item => item.name === 'email').element.value,
                        password: this.fields.find(item => item.name === 'password').element.value,
                        passwordRepeat: this.fields.find(item => item.name === 'repeat-password').element.value,
                    });

                    if (result) {
                        if (result.error || !result.user.id) {
                            throw new Error(result.message);
                        }
                        location.href = '#/main';
                    }
                } catch (error) {
                    return console.log(error);
                }
            }

            try {
                const result = await CustomHttp.request(config.host + '/login', "POST", {
                    email: this.fields.find(item => item.name === 'email').element.value,
                    password: this.fields.find(item => item.name === 'password').element.value,
                });

                if (result) {
                    if (
                        result.error ||
                        !result.tokens.accessToken ||
                        !result.tokens.refreshToken ||
                        !result.user.id ||
                        !result.user.name ||
                        !result.user.lastName
                    ){
                        throw new Error(result.message);
                    }
                    Auth.setTokens(result.tokens.accessToken, result.tokens.refreshToken);
                    Auth.setUserInfo({
                        name: result.user.name,
                        lastName: result.user.lastName,
                        userId: result.user.id
                    });

                    location.href = '#/main';
                }

            } catch (error) {
                console.log(error);
            }


        }
    }
}
