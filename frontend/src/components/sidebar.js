import { CustomHttp } from "../services/custom-http.js";
import config from "../../config/config.js";

export class Sidebar {

    constructor() {
        this.balance = null;
        this.links = document.querySelectorAll(".nav-link");
        this.defaultSVGColor = "#052C65";

        this.init();
    }

    async init() {
        const balance = document.getElementById('balance');
        try {
            const result = await CustomHttp.request(config.host + '/balance');
            if (result) {
                if (result.error) {
                    throw new Error(result.error);
                }
                this.balance = result.balance;
                balance.innerText = result.balance + '$';
            }
        } catch (error) {
            console.log(error.message);
        }
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

