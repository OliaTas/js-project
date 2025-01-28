import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class Sidebar {
    constructor() {
        this.balance = null;

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

       
    }
}