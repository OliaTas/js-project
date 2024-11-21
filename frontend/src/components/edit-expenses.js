export class EditExpenses {
    constructor() {
        this.cardName = document.getElementById('card-text');
        this.input = document.getElementById("editExpenses")
        this.saveBtn = document.getElementById('btn-save-expenses');
        this.cancelBtn = document.getElementById('btn-cancel-expenses');


        const that = this;

        this.saveBtn.onclick = function () {
            that.saveEditProcess();
        }

        this.cancelBtn.onclick = function () {
            that.cancelEditProcess();
        }

        this.input.placeholder = this.cardName;
    }


    saveEditProcess () {
        localStorage.setItem('cardName', this.input.value)
        console.log(localStorage.cardName)

        location.href = '#/expenses';
    }
    cancelEditProcess () {
        location.href = '#/expenses';
    }




}