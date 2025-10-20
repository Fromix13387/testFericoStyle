import {api} from "../untils/api.js";

export class UserService {
    static async register(email, password) {
        return api("/auth/register", { method: "POST", body: JSON.stringify({ email, password }) })
    }
    static async login(email, password) {
        return api("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
    }
    static async logout() {
        await api("/auth/logout", { method: "POST" });
        this.delete()
    }
    static save(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }
    static delete() {
        localStorage.removeItem('user');
    }
    static getUser() {
        try {
            return JSON.parse(localStorage.getItem('user') ?? '{}');
        } catch (e) {
            return {};
        }

    }
    static async load() {
        const user = await api("/user", { method: "GET" });
        if(user) this.save(user.data);
        else this.delete();
    }
}