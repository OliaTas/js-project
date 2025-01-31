import { CustomHttp } from "../services/custom-http.js";
import config from "../../config/config.js";

export class IncomeExpenses {
    constructor() {
        this.modal = document.getElementById('modal');
        this.operations = [];

        this.dateFilters = {
            today: document.getElementById('today'),
            week: document.getElementById('week'),
            month: document.getElementById('month'),
            year: document.getElementById('year'),
            all: document.getElementById('all'),
            interval: document.getElementById('interval')
        };

        this.dateInputs = {
            from: document.getElementById('dateFrom'),
            to: document.getElementById('dateTo')
        };

        this.currentFilter = 'today';

        this.bindEventListeners();
        this.loadOperations();

        const createIncomeButton = document.getElementById('create-income');
        const createExpenseButton = document.getElementById('create-expense');
        createIncomeButton.addEventListener('click', () => this.createIncomeExpenseProcess('income'));
        createExpenseButton.addEventListener('click', () => this.createIncomeExpenseProcess('expense'));
    }

    bindEventListeners() {
        const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
        console.log('filterButtons:', filterButtons);

        filterButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const filterKey = event.currentTarget.getAttribute('data-filter');
                this.setActiveFilter(filterKey);
                this.currentFilter = filterKey;
                this.applyFilter(filterButtons);
            });
        });

        [this.dateInputs.from, this.dateInputs.to].forEach(input => {
            input.addEventListener('change', () => {
                if (this.currentFilter === 'interval') {
                    this.applyFilter(filterButtons);
                }
            });
        });
    }

    setActiveFilter(filterKey) {
        if (!this.dateFilters[filterKey]) {
            console.error('Неизвестный фильтр:', filterKey);
            return;
        }

        Object.values(this.dateFilters).forEach(button => button.classList.remove('active'));
        this.dateFilters[filterKey].classList.add('active');

        const isInterval = filterKey === 'interval';
        [this.dateInputs.from, this.dateInputs.to].forEach(input => {
            input.classList.toggle('d-none', !isInterval);
        });
    }

    async loadOperations() {
        try {
            const result = await CustomHttp.request(config.host + `/operations`, "GET");

            if (result.error) {
                throw new Error(result.error);
            }

            this.operations = result;
            console.log(this.operations);

            this.applyFilter(); // фильтрация при загрузке
        } catch (error) {
            console.error(error);
        }
    }

    applyFilter(btns) {
        let filteredOperations = [];
        const today = new Date();

        btns.forEach(btn => {
            const filterKey = btn.getAttribute('data-filter');

            switch (filterKey) {
                case 'today':
                    filteredOperations = this.operations.filter(op => this.isToday(op.date));
                    break;
                case 'week':
                    filteredOperations = this.operations.filter(op => this.isThisWeek(op.date));
                    break;
                case 'month':
                    filteredOperations = this.operations.filter(op => this.isThisMonth(op.date));
                    break;
                case 'year':
                    filteredOperations = this.operations.filter(op => this.isThisYear(op.date));
                    break;
                case 'all':
                    filteredOperations = [...this.operations];
                    break;
                case 'interval':
                    const fromDate = this.dateInputs.from.value ? new Date(this.dateInputs.from.value) : null;
                    const toDate = this.dateInputs.to.value ? new Date(this.dateInputs.to.value) : null;
    
                    if (fromDate && toDate) {
                        filteredOperations = this.operations.filter(op => {
                            const opDate = new Date(op.date);
                            return opDate >= fromDate && opDate <= toDate;
                        });
                    } else {
                        console.error('Не указан корректный диапазон дат.');
                    }
                    break;
            }
        });

        
        this.showOperationsProcess(filteredOperations);
    }

    isToday(date) {
        const today = new Date();
        const opDate = new Date(date);

        return (
            opDate.getDate() === today.getDate() &&
            opDate.getMonth() === today.getMonth() &&
            opDate.getFullYear() === today.getFullYear()
        );
    }

    isThisWeek(date) {
        const today = new Date();
        const opDate = new Date(date);

        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        return opDate >= startOfWeek && opDate <= endOfWeek;
    }

    isThisMonth(date) {
        const today = new Date();
        const opDate = new Date(date);

        return (
            opDate.getMonth() === today.getMonth() &&
            opDate.getFullYear() === today.getFullYear()
        );
    }

    isThisYear(date) {
        const today = new Date();
        const opDate = new Date(date);

        return opDate.getFullYear() === today.getFullYear();
    }

    showOperationsProcess(filteredOperations) {
        const tableBody = document.getElementById('operations-tbody');
        tableBody.innerHTML = '';

        if (filteredOperations.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6">Нет операций для отображения</td></tr>';
            return;
        }

        filteredOperations.forEach((operation, index) => {
            const tr = document.createElement('tr');
            tr.dataset.id = operation.id;

            tr.innerHTML = `
                <th scope="row">${index + 1}</th>
                <td class="${operation.type === 'доход' ? 'text-success' : 'text-danger'}">${operation.type}</td>
                <td>${operation.category}</td>
                <td>${operation.amount}</td>
                <td>${operation.date}</td>
                <td>${operation.comment}</td>
                <td>
                    <button type="button" class="btn btn-delete" data-id="${operation.id}">
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.5 5.5C4.77614 5.5 5 5.72386 5 6V12C5 12.2761 4.77614 12.5 4.5 12.5C4.22386 12.5 4 12.2761 4 12V6C4 5.72386 4.22386 5.5 4.5 5.5Z"
                                      fill="black"/>
                                <path d="M7 5.5C7.27614 5.5 7.5 5.72386 7.5 6V12C7.5 12.2761 7.27614 12.5 7 12.5C6.72386 12.5 6.5 12.2761 6.5 12V6C6.5 5.72386 6.72386 5.5 7 5.5Z"
                                      fill="black"/>
                                <path d="M10 6C10 5.72386 9.77614 5.5 9.5 5.5C9.22386 5.5 9 5.72386 9 6V12C9 12.2761 9.22386 12.5 9.5 12.5C9.77614 12.5 10 12.2761 10 12V6Z"
                                      fill="black"/>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M13.5 3C13.5 3.55228 13.0523 4 12.5 4H12V13C12 14.1046 11.1046 15 10 15H4C2.89543 15 2 14.1046 2 13V4H1.5C0.947715 4 0.5 3.55228 0.5 3V2C0.5 1.44772 0.947715 1 1.5 1H5C5 0.447715 5.44772 0 6 0H8C8.55229 0 9 0.447715 9 1H12.5C13.0523 1 13.5 1.44772 13.5 2V3ZM3.11803 4L3 4.05902V13C3 13.5523 3.44772 14 4 14H10C10.5523 14 11 13.5523 11 13V4.05902L10.882 4H3.11803ZM1.5 3V2H12.5V3H1.5Z"
                                      fill="black"/>
                            </svg>
                    </button>
                    <button type="button" class="btn btn-edit" data-id="${operation.id}">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.1465 0.146447C12.3417 -0.0488155 12.6583 -0.0488155 12.8536 0.146447L15.8536 3.14645C16.0488 3.34171 16.0488 3.65829 15.8536 3.85355L5.85357 13.8536C5.80569 13.9014 5.74858 13.9391 5.68571 13.9642L0.68571 15.9642C0.500001 16.0385 0.287892 15.995 0.146461 15.8536C0.00502989 15.7121 -0.0385071 15.5 0.0357762 15.3143L2.03578 10.3143C2.06092 10.2514 2.09858 10.1943 2.14646 10.1464L12.1465 0.146447ZM11.2071 2.5L13.5 4.79289L14.7929 3.5L12.5 1.20711L11.2071 2.5ZM12.7929 5.5L10.5 3.20711L4.00001 9.70711V10H4.50001C4.77616 10 5.00001 10.2239 5.00001 10.5V11H5.50001C5.77616 11 6.00001 11.2239 6.00001 11.5V12H6.29291L12.7929 5.5ZM3.03167 10.6755L2.92614 10.781L1.39754 14.6025L5.21903 13.0739L5.32456 12.9683C5.13496 12.8973 5.00001 12.7144 5.00001 12.5V12H4.50001C4.22387 12 4.00001 11.7761 4.00001 11.5V11H3.50001C3.28561 11 3.10272 10.865 3.03167 10.6755Z"
                                      fill="black"/>
                            </svg>
                    </button>
                </td>
            `;
            tr.querySelector('.btn-edit').addEventListener('click', (e) => this.editIncomeExpenseProcess(e));
            tr.querySelector('.btn-delete').addEventListener('click', (e) => this.openDeleteModal(e));
            tableBody.appendChild(tr);
        });
    }

    editIncomeExpenseProcess(event) {
        const dataId = parseInt(event.currentTarget.getAttribute('data-id'));
        console.log(dataId);
        location.href = `#/edit-income-expenses?id=${dataId}`;
    }

    openDeleteModal(event) {
        const operationId = event.currentTarget.getAttribute('data-id');
        if (!operationId) {
            console.error('Operation ID is missing.');
            return;
        }

        const deleteOperationButton = document.getElementById('delete');
        deleteOperationButton.setAttribute('data-id', operationId);
        deleteOperationButton.addEventListener('click', () => this.deleteOperationProcess());

        this.modal.style.display = 'flex';

        const cancelOperationButton = document.getElementById('cancel');
        cancelOperationButton.addEventListener('click', () => this.cancelDeletionProcess());
    }

    createIncomeExpenseProcess(type) {
        localStorage.setItem('operationType', type);
        window.location.href = '#/create-income-expenses';
    }

    async deleteOperationProcess() {
        try {
            const deleteOperationButton = this.modal.querySelector('#delete');
            if (!deleteOperationButton) {
                throw new Error('Delete button not found.');
            }

            const operationId = deleteOperationButton.getAttribute('data-id');
            if (!operationId) {
                throw new Error('Operation ID is missing.');
            }

            const result = await CustomHttp.request(`${config.host}/operations/${operationId}`, "DELETE");

            if (result.error) {
                throw new Error(result.error);
            }
            const operationRow = document.querySelector(`tr[data-id="${operationId}"]`); // Удаление строки из таблицы
            if (operationRow) {
                operationRow.remove();
            }
        } catch (error) {
            console.error(error);
        } finally {
            this.modal.style.display = 'none';
        }
    }

    cancelDeletionProcess() {
        this.modal.style.display = 'none';
    }
}

