import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class CreateExpenses {
    constructor() {

        this.createExpenseBtn = document.getElementById('create-expense-btn');
        this.cancelExpenseBtn = document.getElementById('cancel-create-expense-btn');
        this.input = document.getElementById('creatExpenses');

        this.addEventListeners();
    }

    addEventListeners() {
        this.createExpenseBtn.addEventListener('click', () => {
            this.createExpense ();
        });

        this.cancelExpenseBtn.addEventListener('click', () => {
            this.cancelCreation();
        });
    }

    async createExpense() {
            const categoryExpense = this.input.value.trim();
    
            if (categoryExpense === "") {
                alert("Название категории не может быть пустым.");
                return;
            }
    
            try {
                const result = await CustomHttp.request(config.host + '/categories/expense', "POST", {
                    title: categoryExpense
                });
       
                if (result.error) {
                    throw new Error(result.error);
                }
    
                this.input.value = '';
    
                window.location.href = '#/expenses';
            } catch (error) {
                console.log(error);
            }
        }
    
       
        cancelCreation() {
            this.input.value = '';
            window.location.href = '#/expenses'; 
        }


}