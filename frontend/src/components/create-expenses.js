export class CreateExpenses {
    constructor() {

        this.createExpenseBtn = document.getElementById('create-expense-btn');
        this.cancelExpenseBtn = document.getElementById('cancel-create-expense-btn');
        this.input = document.getElementById('creatExpenses');

        const that = this;

        this.createExpenseBtn.onclick = function () {
            that.createExpenseProcess();
        }

        this.cancelExpenseBtn.onclick = function () {
            that.cancelExpenseProcess();
        }
    }

    createExpenseProcess () {
        if (!this.input.value) {
            this.input.style.border = '1px solid red';
            console.log(this.input.value)
        } else {
            location.href = '#/expenses';
        }


    }

    cancelExpenseProcess () {
        location.href = '#/expenses';
    }


}