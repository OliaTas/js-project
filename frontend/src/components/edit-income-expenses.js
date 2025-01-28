import { CustomHttp } from "../services/custom-http.js";
import config from "../../config/config.js";

export class EditIncomeExpenses {
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
        this.operationId = null;

        this.loadCategoriesProcess();

        this.typeSelect.addEventListener('change', () => this.loadCategoriesProcess());

        this.submitButton.addEventListener('click', (event) => this.submitEditProcess(event));

        this.cancelButton.addEventListener('click', () => this.cancelEditProcess());

        this.loadOperationData();
    }

    async loadOperationData() {
        const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
        const operationId = urlParams.get('id');

        if (!operationId) {
            console.error("Operation ID is missing");
            return;
        }

        this.operationId = operationId;

        try {
            const result = await CustomHttp.request(config.host + `/operations/${operationId}`, "GET");

            if (result.error) {
                throw new Error(result.error);
            }

            console.log(result);

            this.typeSelect.value = result.type;
            await this.loadCategoriesProcess(); // Перезагружаем категории, чтобы выбрать правильную для типа
            this.categorySelect.value = result.category;
            this.amountInput.value = result.amount;
            this.dateInput.value = result.date;
            this.commentInput.value = result.comment;

        } catch (error) {
            console.error(error);
        }
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
            
        } catch (error) {
            console.error(error);
        }
    }

    async submitEditProcess(event) {
        event.preventDefault();

        const type = this.typeSelect.value;
        const category_id = (this.typeSelect.value === 'income' ? this.incomeCategory : this.expenseCategory)
                           .find(item => item.title === this.categorySelect.value)?.id;

        const amount = this.amountInput.value.trim();
        const date = this.dateInput.value.trim();
        const comment = this.commentInput.value.trim();

        const inputs = [this.amountInput, this.dateInput, this.commentInput]; 
        inputs.forEach(input => input.style.border = '');

        if (!type || !amount || isNaN(parseFloat(amount)) || !date || !comment || !category_id) {
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

        try {
            let result;
            result = await CustomHttp.request(config.host + `/operations/${this.operationId}`, "PUT", operationData);

            if (result.error) {
                throw new Error(result.error);
            }

            window.location.href = '#/income-expenses';
        } catch (error) {
            console.error(error);
        }
    }

    cancelEditProcess() {
        this.cancelButton.addEventListener('click', () =>
            location.href = '#/income-expenses');
    }
}
