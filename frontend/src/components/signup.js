(function () {
    const Form = {
        agreeElement : null,
        processElement : null,
        fields: [
            {
                name: 'name',
                id: 'name',
                element: null,
                regex: /([А-ЯЁ][а-яё]+[\-\s]?){3,}/,
                valid: false,
            },
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
            {
                name: 'repeat-password',
                id: 'repeat-password',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false,
            },
        ],
        init () {
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


        },
        validateField(field, element) {

            if(!element.value || !element.value.match(field.regex)) {
                element.parentNode.lastElementChild.style.borderColor = 'red';
                field.valid = false;
            } else {
                element.parentNode.lastElementChild.removeAttribute('style');
                field.valid = true;
            }
            this.validateForm();
        },
        validateForm() {
            const validForm = this.fields.every(item => item.valid);

            if(validForm) {
                this.processElement.removeAttribute('disabled');
            } else {
                this.processElement.setAttribute('disabled', 'disabled');
            }
            return validForm;
        },
        processForm() {
            if(this.validateForm()) {

                location.href = '#/index.html';
            }
        }
    };
    Form.init();
})();


