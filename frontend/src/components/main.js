// import { CustomHttp } from "../services/custom-http.js";
// import config from "../../config/config.js";
// import {Chart} from "chart.js/auto";
// export class Main {
//     constructor() {
   
//     }


// }

import { Chart } from "chart.js/auto";
import { IncomeExpenses } from "./income-expenses.js"; // Подключаем класс IncomeExpenses
import config from "../../config/config.js";

export class Main {
    // constructor() {
    //     this.incomeExpenses = new IncomeExpenses();
    //     this.incomeData = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };
    //     this.expensesData = { labels: [], datasets: [{ data: [], backgroundColor: [] }] };

    //     this.initializeCharts();
    // }

    // async initializeCharts() {
    //     // Ждем загрузки операций
    //     await this.incomeExpenses.loadOperations();

    //     // Получаем динамические данные для доходов и расходов
    //     const incomeOperations = this.incomeExpenses.operations.filter(op => op.type === "доход");
    //     const expenseOperations = this.incomeExpenses.operations.filter(op => op.type === "расход");

    //     // Формируем данные для доходов
    //     this.incomeData.labels = incomeOperations.map(op => op.category);  // Получаем категории
    //     // console.log(this.incomeData.labels)
    //     this.incomeData.datasets[0].data = incomeOperations.map(op => op.amount);  // Получаем суммы
    //     // console.log(this.incomeData.datasets[0].data)

    //     this.incomeData.datasets[0].backgroundColor = ['red', 'orange', 'yellow', 'green', 'blue'];  // Пример цветов для каждого сегмента

    //     // Формируем данные для расходов
    //     this.expensesData.labels = expenseOperations.map(op => op.category);  // Получаем категории
    //     this.expensesData.datasets[0].data = expenseOperations.map(op => op.amount);  // Получаем суммы
    //     this.expensesData.datasets[0].backgroundColor = ['red', 'orange', 'yellow', 'green', 'blue'];  // Пример цветов для каждого сегмента

    //     // Создание графиков
    //     this.createIncomeChart();
    //     this.createExpensesChart();
    // }

    // createIncomeChart() {
    //     const incomeCtx = document.getElementById('incomeChart').getContext('2d');
    //     incomeCtx.canvas.width = 360; // Установка ширины канваса
    //     incomeCtx.canvas.height = 360; // Установка высоты канваса
    //     new Chart(incomeCtx, {
    //         type: 'pie',
    //         data: this.incomeData,
    //         options: {
    //             responsive: true,
    //             plugins: {
    //                 legend: {
    //                     position: 'top',
    //                 },
    //                 tooltip: {
    //                     callbacks: {
    //                         label: function(tooltipItem) {
    //                             return `${tooltipItem.label}: ${tooltipItem.raw}`;
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     });
    // }

    createExpensesChart() {
        const expensesCtx = document.getElementById('expensesChart').getContext('2d');
        expensesCtx.canvas.width = 360; // Установка ширины канваса
        expensesCtx.canvas.height = 360; // Установка высоты канваса
        new Chart(expensesCtx, {
            type: 'pie', // Для расходов тоже можно использовать круговой график
            data: this.expensesData,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return `${tooltipItem.label}: ${tooltipItem.raw}`;
                            }
                        }
                    }
                }
            }
        });
    }
}
