import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class EditIncomes {
    constructor() {
        this.cardName = document.getElementById('card-text');
        this.categoryNameInput = document.getElementById("category-name")
        this.saveBtn = document.getElementById('btn-save');
        this.cancelBtn = document.getElementById('btn-cancel');
        this.incomeCategory = null;

        this.init();
        this.saveEditProcess();
        this.cancelEditProcess();
    }

    async init() {
           try {
            const categoryId = sessionStorage.getItem('editingCategoryId');

            if (!categoryId) {
                throw new Error('Category ID not found in sessionStorage');
            }
            const result = await CustomHttp.request(config.host + `/categories/income/${categoryId}`, "GET");

            if (result) {
                this.categoryNameInput.value = result.title; 
                this.incomeCategory = result; 
                console.log(this.incomeCategory);          
            }
        } catch (error) {
            console.log(error);
        }
    }

    saveEditProcess() {
        this.saveBtn.addEventListener('click', async () => {
            const updatedCategoryName = this.categoryNameInput.value;

            try {
                const result = await CustomHttp.request(config.host + `/categories/income/${this.incomeCategory.id}`, "PUT", {
                    title: updatedCategoryName
                });

                if (result) {
                    location.href = '#/incomes';
                }
            } catch (error) {
                console.log(error);
            }
        });
    }

    cancelEditProcess() {
        this.cancelBtn.addEventListener('click', () => {
            window.location.href = '#/incomes';
        });
    }




}