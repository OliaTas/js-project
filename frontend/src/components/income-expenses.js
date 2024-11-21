export class IncomeExpenses {
    constructor() {
        this.deleteIncomeExpenseBtn = document.getElementsByClassName('delete-in-ex-btn');
        this.editIncomeExpenseBtn = document.getElementsByClassName('edit-in-ex-btn');
        this.modal = document.getElementById('modal');

        const that = this;
        for (let i = 0; i < this.deleteIncomeExpenseBtn.length; i++) this.deleteIncomeExpenseBtn[i].onclick =  function () {
            that.deleteIncomeExpenseProcess();
        }

        for (let i = 0; i < this.editIncomeExpenseBtn.length; i++) this.editIncomeExpenseBtn[i].onclick =  function () {
            that.editIncomeExpenseProcess();
        }

    }

    deleteIncomeExpenseProcess () {
        this.modal.style.display = 'flex';
    }
    editIncomeExpenseProcess () {
        location.href = '#/edit-income-expenses';
    }
}