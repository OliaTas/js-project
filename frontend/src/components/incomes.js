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
                this.showCardsProcess();
                this.addCardProcess();           
            }
        } catch (error) {
            return console.log(error)
        }
    }

    showCardsProcess() {
        if(this.incomeCategory) {
            const block = document.getElementById('block');
            const addCardButton = document.querySelector('.card-add');

            this.incomeCategory.forEach((category) => {
            const newCard = document.createElement('div');
            newCard.classList.add('col');
            
            const card = document.createElement('div');
            card.classList.add('card');
            
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            
            const cardTitle = document.createElement('h2');
            cardTitle.classList.add('card-text');
            cardTitle.innerText = category.title;  
            
            const btnGroup = document.createElement('div');
            btnGroup.classList.add('d-flex', 'justify-content-between', 'align-items-center');
            
            const buttons = document.createElement('div');
            buttons.classList.add('btn-group');
            
            const editButton = document.createElement('button');
            editButton.type = 'button';
            editButton.classList.add('btn', 'btn-sm', 'btn-primary', 'btn-edit');
            editButton.innerText = 'Редактировать';
            
            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.classList.add('btn', 'btn-sm', 'btn-danger', 'btn-delete');
            deleteButton.innerText = 'Удалить';
            
            buttons.appendChild(editButton);
            buttons.appendChild(deleteButton);
            
            btnGroup.appendChild(buttons);
            
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(btnGroup);
            
            card.appendChild(cardBody);
            
            newCard.appendChild(card);

            block.insertBefore(newCard, addCardButton.closest('.col'));
            })
            
            
            this.editIncomeProcess();
            this.deleteIncomeProcess();
        }
    };

    editIncomeProcess() {
        const editButtons = document.querySelectorAll('.btn-edit'); 
        editButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const categoryId = this.incomeCategory[index].id;
            
            sessionStorage.setItem('editingCategoryId', categoryId);

              window.location.href = `#/edit-income?id=${categoryId}`;
        });
    });
    }

    deleteIncomeProcess() {
        const deleteButton = document.querySelectorAll('.btn-delete');
        const modal = new bootstrap.Modal(document.getElementById("modal"));
        
        deleteButton.forEach((button) => {
            button.addEventListener('click', (event) => {
            const categoryId = event.target.getAttribute('data-id');
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
       
    }


    async deleteCategory(categoryId) {
        try {
            const result = await CustomHttp.request(config.host + `/categories/income/${this.incomeCategory.id}`, "DELETE");
            if (result.error) {
                throw new Error(result.error);
            }
            
            const cardToRemove = document.querySelector(`.col[data-id="${categoryId}"]`);
                if (cardToRemove) {
                    cardToRemove.remove();
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