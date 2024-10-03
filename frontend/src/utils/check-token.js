import {Auth} from "../services/auth";

export class CheckAccessToken {
    constructor() {
        this.init();
    }

    async init() {
        const accessToken = localStorage.getItem(Auth.accessTokenKey)
        if(!accessToken) {
            location.href = '#login';
        }
    }
}