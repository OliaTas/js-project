export class Incomes {
    constructor() {
        this.editButton = document.getElementById('btn-edit');
        this.deleteButton = document.getElementById('btn-delete');
        this.modal = document.getElementById('modal');
        this.btnDelete = document.getElementById('btn-y-delete');
        this.btnNoDelete = document.getElementById('btn-no-delete');

        const that = this;
        this.editButton.onclick = function () {
            that.editButtonProcess ();
        }

        this.deleteButton.onclick = function () {
            that.deleteButtonProcess ();
        }

        this.btnDelete.onclick = function () {
            that.modalProcess ();
        }
        this.btnNoDelete.onclick = function () {
            that.modalProcess ();
        }
    }

    editButtonProcess () {
        location.href = '#/edit-income';
    }

    deleteButtonProcess () {
        this.modal.style.display = 'flex';
    }

    modalProcess () {
        this.modal.style.display = 'on';
    }


}