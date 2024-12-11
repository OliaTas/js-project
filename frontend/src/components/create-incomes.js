export class CreateIncomes {
    constructor() {

        this.createIncomeBtn = document.getElementById('create-income-btn');
        this.cancelIncomeBtn = document.getElementById('cancel-create-income-btn');
        this.input = document.getElementById('creatIncome');
        this.block = document.getElementById('block');


        const that = this;

        this.createIncomeBtn.onclick = function () {
            // localStorage.setItem('cardName', this.input.value)
            // console.log(localStorage.cardName)
            that.createIncomeProcess();
        }

        this.cancelIncomeBtn.onclick = function () {
            that.cancelIncomeProcess();
        }
    }


    createIncomeProcess() {
        if (!this.input.value) {
            this.input.style.border = '1px solid red';
            console.log(this.input.value)
        } else {
            location.href = '#/incomes';
            //добавление категории
            let newBlock = document.querySelector('.col');
            let clonedBlock = newBlock.cloneNode(true);
            this.block.appendChild(clonedBlock);

        }


    }

    cancelIncomeProcess() {
        location.href = '#/incomes';
    }


}