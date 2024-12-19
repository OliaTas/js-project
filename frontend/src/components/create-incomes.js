import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class CreateIncomes {
    constructor() {

        this.createIncomeBtn = document.getElementById('create-income-btn');
        this.cancelIncomeBtn = document.getElementById('cancel-create-income-btn');
        this.input = document.getElementById('creatIncome');
        
        this.addEventListeners();
    }


    addEventListeners() {
        this.createIncomeBtn.addEventListener('click', () => {
            this.createIncome();
        });

        this.cancelIncomeBtn.addEventListener('click', () => {
            this.cancelCreation();
        });
    }

    async createIncome() {
        const categoryIncome = this.input.value.trim();

        if (categoryIncome === "") {
            alert("Название категории не может быть пустым.");
            return;
        }

        try {
            const result = await CustomHttp.request(config.host + '/categories/income', "POST", {
                title: categoryIncome
            });
   
            if (result.error) {
                throw new Error(result.error);
            }

            this.input.value = '';

            window.location.href = '#/incomes';
        } catch (error) {
            console.log(error);
        }
    }

   
    cancelCreation() {
        this.input.value = '';
        window.location.href = '#/incomes'; 
    }

  }