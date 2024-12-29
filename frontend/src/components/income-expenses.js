import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class IncomeExpenses {
    constructor() {
        this.deleteIncomeExpenseBtn = document.getElementsByClassName('delete-in-ex-btn');
        this.editIncomeExpenseBtn = document.getElementsByClassName('edit-in-ex-btn');
        this.modal = document.getElementById('modal');
        this.createIncomeButton = document.getElementById('create-income');
        this.createExpenseButton = document.getElementById('create-expense');
        this.deleteButton = document.getElementById('delete-button');
        this.editButton = document.getElementById('edit-button');
        this.deleteOperationButton = document.getElementById('delete');
        this.cancelOperationButton = document.getElementById('cancel');

        this.operations = [];
        
        this.createIncomeButton.addEventListener('click', () => this.createIncomeExpenseProcess());
        this.createExpenseButton.addEventListener('click', () => this.createIncomeExpenseProcess());
        this.deleteButton.addEventListener('click', () => this.deleteIncomeExpenseProcess());
        this.deleteOperationButton.addEventListener('click', () => this.deleteOperationProcess());
        this.cancelOperationButton.addEventListener('click', () => this.cancelDeletionProcess());

        this.loadOperations();

    }

    async loadOperations() {
        try {
            const result = await CustomHttp.request(config.host + `/operations`, "GET");

            if (result.error) {
                throw new Error(result.error);
            }

            this.operations = result; 
            console.log(this.operations)
            this.showOperationsProcess(); 
        } catch (error) {
            console.error(error);
        }
    }

     
     showOperationsProcess() {
        
        

    }

    createIncomeExpenseProcess() {
        window.location.href = '#/create-income-expenses';
     }

    deleteIncomeExpenseProcess () {
         this.modal.style.display = 'flex';

         
    }

    async deleteOperationProcess(operationId) {
        try {
        const result = await CustomHttp.request(config.host + `/operations/${operationId}`, "DELETE");

        if (result.error) {
            throw new Error(result.error);
        }
       
        const operationCard = document.querySelector(`.operation-card[data-id="${operationId}"]`);
        if (operationCard) {
            operationCard.remove();
        }
        } catch (error) {
        console.error(error);
        }
    }
    
    cancelDeletionProcess() {
        this.modal.style.display = 'none';
    }

    
    editIncomeExpenseProcess () {
        window.location.href = '#/edit-income-expenses'; 
    }

    
}
