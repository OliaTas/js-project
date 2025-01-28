import { CustomHttp } from "../services/custom-http.js";
import config from "../../config/config.js";

export class CreateIncomeExpenses {
    constructor() {
        this.typeSelect = document.getElementById('type');
        this.categorySelect = document.getElementById('category');
        this.amountInput = document.getElementById('sum');
        this.dateInput = document.getElementById('date');
        this.commentInput = document.getElementById('comment');
        this.form = document.getElementById('income-expense-form');
        this.cancelButton = document.getElementById('cancel-button');
        this.submitButton = document.getElementById('submit-button');

        this.incomeCategory = [];
        this.expenseCategory = [];
        this.categories = [];
        this.categoriesData = null;

        const typeFromLocalStorage = localStorage.getItem('operationType');

        if (typeFromLocalStorage) {
            this.typeSelect.value = typeFromLocalStorage;
            this.loadCategoriesProcess();
        }

        this.typeSelect.addEventListener('change', () => this.loadCategoriesProcess());
        this.submitButton.addEventListener('click', (event) => this.submitCreationProcess(event));
        this.cancelButton.addEventListener('click', () => this.cancelCreationProcess());

    }


    async loadCategoriesProcess() {
        const selectedType = this.typeSelect.value;

        try {
            let result;
            if (selectedType === 'income') {
                result = await CustomHttp.request(config.host + '/categories/income', "GET");
                this.incomeCategory = result;
            } else if (selectedType === 'expense') {
                result = await CustomHttp.request(config.host + '/categories/expense', "GET");
                this.expenseCategory = result;
            }

            this.categorySelect.innerHTML = '';

            const categories = selectedType === 'income' ? this.incomeCategory : this.expenseCategory;
            categories.forEach(category => {
                const option = document.createElement('option');
                option.setAttribute('value', category.title);
                option.innerText = category.title;
                this.categorySelect.appendChild(option);
            });
            const categories_id = categories.find(item => item.title)
            console.log(categories_id)
        } catch (error) {
            console.error(error);
        }
    }


    async submitCreationProcess(event) {
        event.preventDefault();

        const type = this.typeSelect.value;
        const category_id = (this.typeSelect.value === 'income' ? this.incomeCategory : this.expenseCategory)
            .find(item => item.title === this.categorySelect.value)?.id;

        const amount = this.amountInput.value.trim();
        const date = this.dateInput.value.trim();
        const comment = this.commentInput.value.trim();

        const inputs = [this.amountInput, this.dateInput, this.commentInput]; 

        inputs.forEach(input => input.style.border = '');

        if (!type || !amount || isNaN(parseFloat(amount)) || !date || !comment) {
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.border = '1px solid #e50000';
                }
            });
            console.log('Пожалуйста, заполните все обязательные поля корректно.');
            return;
        }

        const operationData = {
            type,
            category_id,
            amount: parseFloat(amount),
            date,
            comment
        };
        console.log(operationData)

        try {

            let result;
            result = await CustomHttp.request(config.host + `/operations`, "POST", operationData);
            console.log(result)

            if (result.error) {
                throw new Error(result.error);
            }

            window.location.href = '#/income-expenses';

        } catch (error) {
            console.error(error);
        }
    }

    cancelCreationProcess() {
        window.location.href = '#/income-expenses';
    }
}

