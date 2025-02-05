import { CustomHttp } from "../services/custom-http.js";
import { Chart } from "chart.js/auto";
import config from "../../config/config.js";

export class Main {
    constructor() {
        this.operations = [];
        this.incomeData = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
        this.expensesData = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };

        this.init();
    }

    async init() {
        this.selectInterval();
    }

    selectInterval() {
        this.period = 'today';
        this.loadOperations(this.period);
        this.intervalButtons = document.querySelectorAll('.btn-tr');
        this.intervalButtons.forEach(item => {
            item.addEventListener('click', () => {
                document.getElementById('dateFrom').classList.add('d-none');
        document.getElementById('dateTo').classList.add('d-none');
                const intervalType = item.getAttribute('id');
                this.intervalButtons.forEach(btn => btn.classList.remove('active'));
                item.classList.add('active');
                switch (intervalType) {
                    case 'today':
                        this.loadOperations('today');
                        break;
                    case 'week':
                        this.loadOperations('week');
                        break;
                    case 'month':
                        this.loadOperations('month');
                        break;
                    case 'year':
                        this.loadOperations('year');
                        break;
                    case 'all':
                        this.loadOperations('all');
                        break;
                    case 'interval':
                        this.loadOperations('interval');
                        const dateFrom = document.getElementById('dateFrom');
                        const dateTo = document.getElementById('dateTo');

                        dateTo.classList.add('m-3');
                        dateFrom.classList.remove('d-none');
                        dateTo.classList.remove('d-none');
                        dateFrom.addEventListener('change', () => this.loadOperations('interval', dateTo.value, dateFrom.value));
                        dateTo.addEventListener('change', () => this.loadOperations('interval', dateTo.value, dateFrom.value));
                        this.loadOperations('interval', dateFrom.value, dateTo.value);
                        break;
                };
            });
        });
    }

    async loadOperations(period, dateTo, dateFrom) {
        let params = '';
        if (period) {
            params = '?period=' + period
        }
        if (period === 'interval' && dateFrom && dateTo) {
            params = `?period=interval&dateFrom=${dateFrom}&dateTo=${dateTo}`;
        }
        try {
            const result = await CustomHttp.request(config.host + `/operations` + params);

            if (result.error) {
                throw new Error(result.error);
            }

            this.operations = result;
            this.processDataOperation();
            this.createIncomeChart();
            this.createExpensesChart();
        } catch (error) {
            console.error(error);
        }
    }

    processDataOperation() {
        const incomeOperations = this.operations.filter(op => op.type === "income");
        const expenseOperations = this.operations.filter(op => op.type === "expense");

        this.incomeData.labels = [...new Set(incomeOperations.map(op => op.category))];
        this.expensesData.labels = [...new Set(expenseOperations.map(op => op.category))];

        this.incomeData.datasets[0].data = this.incomeData.labels.map(label =>
            incomeOperations.filter(op => op.category === label).reduce((sum, op) => sum + op.amount, 0)
        );
        this.expensesData.datasets[0].data = this.expensesData.labels.map(label =>
            expenseOperations.filter(op => op.category === label).reduce((sum, op) => sum + op.amount, 0)
        );

        this.incomeData.datasets[0].backgroundColor = this.generateColors(this.incomeData.labels.length);
        this.expensesData.datasets[0].backgroundColor = this.generateColors(this.expensesData.labels.length);
    }

    generateColors(count) {
        const colors = ["#DC3545", "#FD7E14", "#FFC107", "#20C997", "#0D6EFD"];
        return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
    }

    createIncomeChart() {
        const incomeCtx = document.getElementById('incomeChart').getContext('2d');
        incomeCtx.canvas.width = 100;
        incomeCtx.canvas.height = 100;

        if (this.incomeChart) {
            this.incomeChart.destroy();
        }

         this.incomeChart = new Chart(incomeCtx, {
            type: 'pie',
            data: this.incomeData,
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`
                        }
                    }
                }
            }
        });
    }

    createExpensesChart() {
        const expensesCtx = document.getElementById('expensesChart').getContext('2d');
        expensesCtx.canvas.width = 360; 
        expensesCtx.canvas.height = 360;
        
        if (this.expensesChart) {
            this.expensesChart.destroy();
        }
    
        this.expensesChart = new Chart(expensesCtx, {
            type: 'pie',
            data: this.expensesData,
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`
                        }
                    }
                }
            }
        });
    }
}

