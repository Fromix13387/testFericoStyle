import {api} from "../untils/api.js";

export class TaskService {
    static async list() {
        return api("/tasks").then(res => res.data);
    }
    static async create(data) {
        return api("/tasks", { method: "POST", body: JSON.stringify(data) }).then(res => res.data);
    }
    static async update(id, data) {
        return api(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(data) }).then(res => res.data);
    }
    static async delete(id) {
        return api(`/tasks/${id}`, { method: "DELETE" })
    }
}