import {Incomes} from "./components/incomes.js";
import {Form} from "./components/form.js";
import {Auth} from "./services/auth.js";

export class Router {
    constructor() {
        this.contentElement = document.getElementById('content');
        this.stylesElement = document.getElementById('styles');
        this.titleElement = document.getElementById('title');
        this.profileElement = document.getElementById('profile');
        this.profileFullNameElement = document.getElementById('profile-full-name');

        this.routes = [
            {
                route: '#/signup',
                title: 'Регистрация',
                template: 'templates/signup.html',
                styles: 'styles/form.css',
                load: () => {
                    new Form('signup');
                }
            },
            {
                route: '#/login',
                title: 'Вход в систему',
                template: 'templates/login.html',
                styles: 'styles/form.css',
                load: () => {
                    new Form('login');
                }
            },
            {
                route: '#/main',
                title: 'Главная',
                template: 'templates/main.html',
                styles: 'styles/main.css',
                script: 'src/utils/bootstrap.min.js',
                load: () => {

                }
            },
            {
                route: '#/income-expenses',
                title: 'Доходы и расходы',
                template: 'templates/income-expenses.html',
                styles: 'styles/income-expenses.css',
                load: () => {

                }
            },
            {
                route: '#/create-income-expenses',
                title: 'Создание дохода/расхода',
                template: 'templates/create-income-expenses.html',
                styles: 'styles/income-expenses.css',
                load: () => {

                }
            },
            {
                route: '#/edit-income-expenses',
                title: 'Редактирование дохода/расхода',
                template: 'templates/edit-income-expenses.html',
                styles: 'styles/income-expenses.css',
                load: () => {

                }
            },
            {
                route: '#/incomes',
                title: 'Доходы',
                template: 'templates/incomes.html',
                styles: 'styles/incomes.css',
                load: () => {
                    new Incomes();
                }
            },
            {
                route: '#/create-income',
                title: 'Создание категории доходов',
                template: 'templates/create-income.html',
                styles: 'styles/incomes.css',
                load: () => {

                }
            },
            {
                route: '#/edit-income',
                title: 'Редактирование категории доходов',
                template: 'templates/edit-income.html',
                styles: 'styles/incomes.css',
                load: () => {

                }
            },
            {
                route: '#/expenses',
                title: 'Расходы',
                template: 'templates/expenses.html',
                styles: 'styles/incomes.css',
                load: () => {

                }
            },
            {
                route: '#/create-expenses',
                title: 'Создание категории расходов',
                template: 'templates/create-expenses.html',
                styles: 'styles/incomes.css',
                load: () => {

                }
            },
            {
                route: '#/edit-expenses',
                title: 'Редактирование категории расходов',
                template: 'templates/edit-expenses.html',
                styles: 'styles/incomes.css',
                load: () => {

                }
            },


        ]
    }

    async openRoute () {
        const urlRoute = window.location.hash.split('?')[0];
        if(urlRoute === '#/logout') {
            await Auth.logout();
            window.location.href = '#/login';
            return;
        }

        const newRoute = this.routes.find(item => {
            return item.route === urlRoute;
        });

        if (!newRoute) {
            window.location.href = '#/main';
            return;
        }

        this.contentElement.innerHTML =
            await fetch(newRoute.template).then(response => response.text());
        this.stylesElement.setAttribute('href', newRoute.styles);
        this.titleElement.innerText = newRoute.title;

        const userInfo = Auth.getUserInfo();
        const accessToken = localStorage.getItem(Auth.accessTokenKey);
        if (userInfo && accessToken) {
            this.profileFullNameElement.innerText = userInfo.fullName;
        }

        newRoute.load();

    }
}