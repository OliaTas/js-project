import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {Auth} from "../services/auth.js";
import {UrlManager} from "../utils/url-manager.js";

export class Incomes {
    constructor() {
        this.incomeCategory = [];
        this.init();

    }

    async init() {
        try {
            const result = await CustomHttp.request(config.host + '/categories/income', "GET");
            if (result) {
                if (result.error) {
                    throw new Error(result.error);
                }
                this.incomeCategory = result;
                console.log(this.incomeCategory);
                this.editIncomeProcess();
                this.deleteIncomeProcess();
                this.addCardProcess();           
            }
        } catch (error) {
            return console.log(error)
        }
    }

    editIncomeProcess() {
        const editButtons = document.querySelectorAll('.btn-edit'); 
        editButtons.forEach((button, index) => {
        button.addEventListener('click', (event) => {
            const categoryId = this.incomeCategory[index].id;
            
            sessionStorage.setItem('editingCategoryId', categoryId);

              window.location.href = `#/edit-income?id=${categoryId}`;
        });
    });
    }

    deleteIncomeProcess() {
        const deleteButton = document.querySelectorAll('.btn-delete');
        const modal = new bootstrap.Modal(document.getElementById("modal"));
       
        deleteButton.forEach((button, index) => {
            button.addEventListener('click', (event) => {
                const categoryId = this.incomeCategory[index].id;
                modal.show();

                const btnDelete = document.getElementById("btn-y-delete");
                btnDelete.onclick = () => {
                    this.deleteCategory(categoryId);
                    modal.hide(); 
                };
            });
        });
    
        const btnCancelDelete = document.getElementById("btn-no-delete");
        btnCancelDelete.onclick = () => {
            modal.hide();
        };
    };

    async deleteCategory(categoryId) {
        try {
            const result = await CustomHttp.request(config.host + `/categories/income/${categoryId}`, "DELETE");
            if (result.error) {
                throw new Error(result.error);
            }
            this.incomeCategory = result;
                console.log(this.incomeCategory);
            // this.incomeCategory = this.incomeCategory.filter(category => category.id !== categoryId);
    
            const cardElement = document.querySelectorAll('.card');
            if (cardElement) {
                cardElement.remove();
            }
        } catch (error) {
            console.log(error);
        }
    }

    

    addCardProcess() {
        const addCardBtn = document.getElementById('add-btn');
        addCardBtn.onclick = function () {
            location.href = '#/create-income';
        }
    }


}