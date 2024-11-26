import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
import {Auth} from "../services/auth.js";



export class Incomes {
    constructor() {
        // this.editButton = document.getElementsByClassName('btn-edit');
        // this.cardName = document.getElementById('card-text');
        // this.deleteButton = document.getElementsByClassName('btn-delete');
        // this.modal = document.getElementById('modal');
        // this.btnDelete = document.getElementById('btn-y-delete');
        // this.btnNoDelete = document.getElementById('btn-no-delete');
        // this.addCardBtn = document.getElementById('add-btn');
        // this.block = document.getElementById('block')
        // this.cardText = document.querySelector('.card-text')
        this.incomeCategory = null;

        // const that = this;
        // for (let i = 0; i < this.editButton.length; i++) this.editButton[i].onclick = function () {
        //     that.editIncomeProcess();
        // }
        //
        // for (let i = 0; i < this.deleteButton.length; i++) this.deleteButton[i].onclick = function () {
        //     that.deleteIncomeProcess();
        // }
        //
        // this.btnDelete.onclick = function () {
        //     that.deleteModalProcess();
        // }
        //
        // this.btnNoDelete.onclick = function () {
        //     that.modalProcess();
        // }
        //
        // this.addCardBtn.onclick = function () {
        //     that.addCardProcess();
        // }

        this.init();
    }

    async init() {


             const result = await CustomHttp.request(config.host + '/categories/income/')
             console.log(result)
             if (result) {
                 if (result.error || !result.tokens.accessToken || !result.tokens.refreshToken) {
                     throw new Error(result.message);
                 }

                 this.incomeCategory = result;
                 console.log(this.incomeCategory.categories)
             }




    }

    // editIncomeProcess () {
    //     localStorage.setItem('cardText', this.cardText.value)
    //     console.log(localStorage.cardText)
    //     location.href = '#/edit-income';
    // }
    //
    // deleteIncomeProcess () {
    //    this.modal.style.display = 'flex';
    // }
    //
    // deleteModalProcess () {
    //
    //     document.querySelector('.col').remove(); //удаление карточки
    //     this.modal.style.display = 'none';
    // }
    //
    // modalProcess () {
    //     this.modal.style.display = 'none';
    // }
    //
    // addCardProcess () {
    //     location.href = '#/create-income';
    // }


}