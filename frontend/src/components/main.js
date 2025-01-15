export class Main {
    constructor() {




        // this.createIncomeChart();
        this.chart();
    }

    chart() {

    // Data for the income chart
    const incomeData = {
        labels: ['Salary', 'Freelance', 'Investments', 'Other'],
        datasets: [{
            label: 'Income Distribution',
            data: [5000, 2000, 1500, 800], // Replace these values with actual data
            backgroundColor: ['#FF5733', '#FFC300', '#DAF7A6', '#900C3F'], // Example colors
            hoverOffset: 4
        }]
    };

    // Data for the expenses chart
    const expensesData = {
        labels: ['Rent', 'Food', 'Entertainment', 'Utilities'],
        datasets: [{
            label: 'Expenses Distribution',
            data: [1200, 800, 500, 300], // Replace these values with actual data
            backgroundColor: ['#4A90E2', '#50E3C2', '#F5A623', '#D0021B'], // Example colors
            hoverOffset: 4
        }]
    };

    // Configurations for both charts
    const config = {
        type: 'pie',
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw + ' units';
                        }
                    }
                }
            }
        }
    };

    // // Render the Income Chart
    // const incomeChart = new Chart(document.getElementById('myPieChart'), {
    //     ...config,
    //     data: incomeData
    // });

    // // Render the Expenses Chart
    // const expensesChart = new Chart(document.getElementById('expensesChart'), {
    //     ...config,
    //     data: expensesData
    // });


    
    }
    // createIncomeChart() {
    //     var incomeCanvas = document.getElementById("incomeChart");

    //     Chart.defaults.global.defaultFontFamily = "Lato";
    //     Chart.defaults.global.defaultFontSize = 18;

    //     var incomeData = {
    //         labels: [
    //             "Saudi Arabia",
    //             "Russia",
    //             "Iraq",
    //             "United Arab Emirates",
    //             "Canada"
    //         ],
    //         datasets: [
    //             {
    //                 data: [133.3, 86.2, 52.2, 51.2, 50.2],
    //                 backgroundColor: [
    //                     "#FF6384",
    //                     "#63FF84",
    //                     "#84FF63",
    //                     "#8463FF",
    //                     "#6384FF"
    //                 ]
    //             }]
    //     };

    //     var pieChart = new Chart(incomeCanvas, {
    //         type: 'pie',
    //         data: incomeData
    //     });
    // }


}


