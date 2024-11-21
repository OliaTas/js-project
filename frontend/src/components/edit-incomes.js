export class EditIncomes {
    constructor() {
        this.cardName = document.getElementById('card-text');
        this.input = document.getElementById("editIncome")
        this.saveBtn = document.getElementById('btn-save');
        this.cancelBtn = document.getElementById('btn-cancel');
        this.card  = localStorage.getItem("cardText");

        this.input.placeholder = this.card;

        const that = this;

        this.saveBtn.onclick = function () {
            that.saveEditProcess();
        }

        this.cancelBtn.onclick = function () {
            that.cancelEditProcess();
        }

    }


    saveEditProcess () {
        localStorage.setItem('cardName', this.input.value)
        console.log(localStorage.cardName)

        location.href = '#/incomes';
        const newCardName = localStorage.getItem("cardName");
        console.log(newCardName)
        this.cardName.textContent = newCardName.value

    }
    cancelEditProcess () {
        location.href = '#/incomes';
    }




}