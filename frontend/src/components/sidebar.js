import { CustomHttp } from "../services/custom-http.js";
import config from "../../config/config.js";

export class Sidebar {
    // constructor() {
    //     // this.balance = null;
    //     // this.navLinks = document.getElementsByClassName('nav-link');
    //     // this.toggleBtn = document.querySelector('button.nav-link');
    //     // this.collapsedLinks = document.getElementById('home-collapse')
    //     // this.incomeLink = document.getElementById('income');
    //     // this.expenseLink = document.getElementById('expense');

    //     // document.querySelectorAll('.nav-link.active').forEach(item => item.classList.remove('active'));
    //     // this.activeNavLink = Array.from(this.navLinks).find(item => location.hash.includes(item.id));

    //     // if (this.activeNavLink) {
    //     //     if (this.activeNavLink === this.incomeLink || this.activeNavLink === this.expenseLink) {
    //     //         this.toggleBtn.classList.add('opened');
    //     //         this.toggleBtn.classList.remove('collapsed');
    //     //         this.toggleBtn.setAttribute('aria-expanded', 'true');
    //     //         this.collapsedLinks.classList.add('show');
    //     //     }
    //     //     this.activeNavLink.classList.add('active');

    //     //     this.init();
    //     // }
    // }

    // async init() {
    //     const balance = document.getElementById('balance');
    //     try {
    //         const result = await CustomHttp.request(config.host + '/balance');
    //         if (result) {
    //             if (result.error) {
    //                 throw new Error(result.error);
    //             }
    //             this.balance = result.balance;
    //             balance.innerText = result.balance + '$';
    //         }
    //     } catch (error) {
    //         console.log(error.message);
    //     }

    //     for (let elem of this.navLinks) {
    //         const that = this;

    //         elem.addEventListener('click', function() {
    //             if (this !== that.toggleBtn) {
    //                 if (this === that.incomeLink || this === that.expenseLink) {
    //                     that.toggleBtn.classList.add('opened');
    //                 }
    //                 this.classList.add('active');
    //                 that.activeNavLink = this;
    //             }
    //         });

    //         elem.addEventListener('mouseover', function() {
    //             that.toggleBtn.classList.remove('opened');
    //             if (this === that.incomeLink || this === that.expenseLink) {
    //                 that.toggleBtn.classList.add('opened');
    //                 if (that.activeNavLink === that.incomeLink && this === that.expenseLink) {
    //                     that.incomeLink.classList.remove('active');
    //                 } else if (that.activeNavLink === that.expenseLink && this === that.incomeLink) {
    //                     that.expenseLink.classList.remove('active');
    //                 }
    //             }
    //             that.activeNavLink.classList.remove('active');
    //         });

    //         elem.addEventListener('mouseout', function() {
    //             that.toggleBtn.classList.remove('opened');
    //             if (that.activeNavLink === that.incomeLink || that.activeNavLink === that.expenseLink) {
    //                 that.toggleBtn.classList.add('opened');
    //             }
    //             that.activeNavLink.classList.add('active');
    //         });
    //     }
    // }

    constructor() {
        this.links = document.querySelectorAll(".nav-link");
        this.defaultSVGColor = "#052C65";
        this.init();
    }

    init() {
        this.setActiveLink();
        window.addEventListener("hashchange", () => this.setActiveLink());

        this.links.forEach(link => {
            link.addEventListener("mouseenter", () => this.setHoverStyle(link, true));
            link.addEventListener("mouseleave", () => this.setHoverStyle(link, false));
        });
    }

    setActiveLink() {
        this.links.forEach(link => {
            link.classList.remove("active");
            link.style.color = "#052C65";
            this.setSVGColor(link, this.defaultSVGColor);
        });

        const currentPath = window.location.hash;
        this.links.forEach(link => {
            if (link.getAttribute("href") === currentPath) {
                link.classList.add("active");
                link.style.color = "white";
                this.setSVGColor(link, "white");
            }
        });
    }

    setHoverStyle(link, isHovering) {
        if (!link.classList.contains("active")) {
            link.style.color = isHovering ? "white" : "";
            this.setSVGColor(link, isHovering ? "white" : this.defaultSVGColor);
        }
    }

    setSVGColor(link, color) {
        const svg = link.querySelector("svg");
        if (svg) {
            svg.style.fill = color;
            svg.style.stroke = color;
        }
    }
}

