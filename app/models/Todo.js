import { generateId } from "../utils/GenerateId.js";


export class Todo {
    constructor(data) {
        this.id = data.id
        this.description = data.description
        this.completed = data.completed
        this.createdAt = data.createdAt
        this.updatedAt = data.updatedAt
    }
}
