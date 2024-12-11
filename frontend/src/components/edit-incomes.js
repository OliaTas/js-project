import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";

export class EditIncomes {
    constructor() {
        this.cardName = document.getElementById('card-text');
        this.input = document.getElementById("editIncome")
        this.saveBtn = document.getElementById('btn-save');
        this.cancelBtn = document.getElementById('btn-cancel');
        this.card  = localStorage.getItem("cardText");

        this.input.placeholder = this.card;

        this.saveEditProcess().then();
        this.cancelEditProcess();
    }


    async saveEditProcess () {
        // const result = await CustomHttp.request(config.host + '/api/categories/income/1', "PUT");
        this.saveBtn.onclick = function () {

            location.href = '#/incomes';
        }



    }
    cancelEditProcess () {
        this.cancelBtn.onclick = function () {
            location.href = '#/incomes';
        }

    }




}