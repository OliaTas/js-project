export class Incomes {
    constructor() {
        this.editButton = document.getElementsByClassName('btn-edit');
        this.cardName = document.getElementById('card-text');
        this.deleteButton = document.getElementsByClassName('btn-delete');
        this.modal = document.getElementById('modal');
        this.btnDelete = document.getElementById('btn-y-delete');
        this.btnNoDelete = document.getElementById('btn-no-delete');
        this.addCardBtn = document.getElementById('add-btn');
        this.block = document.getElementById('block')
        this.cardText = document.querySelector('.card-text')

        const that = this;
        for (let i = 0; i < this.editButton.length; i++) this.editButton[i].onclick =  function () {
            that.editIncomeProcess ();
        }

        for (let i = 0; i < this.deleteButton.length; i++) this.deleteButton[i].onclick =  function () {
            that.deleteIncomeProcess ();
        }

        this.btnDelete.onclick = function () {
            that.deleteModalProcess ();
        }

        this.btnNoDelete.onclick = function () {
            that.modalProcess ();
        }

        this.addCardBtn.onclick = function () {
            that.addCardProcess();
        }


    }

    editIncomeProcess () {
        localStorage.setItem('cardText', this.cardText.value)
        console.log(localStorage.cardText)
        location.href = '#/edit-income';
    }

    deleteIncomeProcess () {
       this.modal.style.display = 'flex';
    }

    deleteModalProcess () {

        document.querySelector('.col').remove(); //удаление карточки
        this.modal.style.display = 'none';
    }

    modalProcess () {
        this.modal.style.display = 'none';
    }

    addCardProcess () {
        location.href = '#/create-income';
    }


}