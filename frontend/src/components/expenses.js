import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";

export class Expenses {
    constructor() {
        // this.editExpenses = document.getElementsByClassName('btn-edit');
        // this.cardName = document.getElementsByClassName('card-text');
        // this.deleteExpenses = document.getElementsByClassName('btn-delete');
        // this.modal = document.getElementById('modal');
        // this.btnDelete = document.getElementById('btn-y-delete');
        // this.btnNoDelete = document.getElementById('btn-no-delete');
        // this.addCardBtn = document.getElementById('add-btn');
        //
        // const that = this;
        // for (let i = 0; i < this.editExpenses.length; i++) this.editExpenses[i].onclick =  function () {
        //     that.editExpensesProcess ();
        // }
        //
        // for (let i = 0; i < this.deleteExpenses.length; i++) this.deleteExpenses[i].onclick =  function () {
        //     that.deleteExpensesProcess ();
        // }
        //
        // this.btnDelete.onclick = function () {
        //     that.modalProcess ();
        // }
        //
        // this.btnNoDelete.onclick = function () {
        //     that.modalProcess ();
        // }
        //
        // this.addCardBtn.onclick = function () {
        //     that.addCardProcess();
        // }
        this.expenseCategory = [];


        this.init();
    }
    async init() {
        try {
            const result = await CustomHttp.request(config.host + '/categories/expense');
            if (result) {
                if (result.error) {
                    throw new Error(result.error);
                }
                this.expenseCategory = result;
                console.log(this.expenseCategory)
            }
        } catch (error) {
            return console.log(error)
        }
    }
    // editExpensesProcess () {
    //     location.href = '#/edit-expenses';
    //     // document.getElementById("editIncome").placeholder = "Edit name";
    // }
    //
    // deleteExpensesProcess () {
    //     this.modal.style.display = 'flex';
    // }
    //
    // modalProcess () {
    //     this.modal.style.display = 'none';
    // }
    //
    // addCardProcess () {
    //     location.href = '#/create-expenses';
    // }


}