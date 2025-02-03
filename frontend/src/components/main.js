import { CustomHttp } from "../services/custom-http.js";
import { Chart } from "chart.js/auto";
import config from "../../config/config.js";

export class Main {
    constructor() {
        this.operations = [];
        this.incomeData = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
        this.expensesData = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };

        this.loadCharts();
    }

    async loadCharts() {
        try {
            const result = await CustomHttp.request(config.host + `/operations`, "GET");

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
        incomeCtx.canvas.width = 360;
        incomeCtx.canvas.height = 360;
        new Chart(incomeCtx, {
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
        new Chart(expensesCtx, {
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

