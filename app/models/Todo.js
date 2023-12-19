import { generateId } from "../utils/GenerateId.js";

export class Todo {
    constructor(data) {
        this.id = data.id;
        this.description = data.description;
        this.completed = data.completed;
    }

    getTodoTemplate() {
        return `
            <li class="${this.completed ? 'completed' : ''}">
                <input type="checkbox" ${this.completed ? 'checked' : ''}
                    onchange="app.TodoController.toggleTodoStatus('${this.id}')">
                ${this.description}
                <button onclick="app.TodoController.deleteTodo('${this.id}')">X</button>
            </li>
        `
    }
}
