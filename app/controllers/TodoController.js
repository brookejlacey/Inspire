import { todoService } from "../services/TodoService.js";
import { AppState } from "../AppState.js";
import { setHTML } from "../utils/Writer.js";

export class TodoController {
    constructor() {
        console.log('TodoController starting');

        AppState.on('todos', () => this.drawTodos())

        if (AppState.user) {
            this.getTodos()
        } else {
            AppState.on('account', () => {
                if (AppState.account) {
                    this.getTodos()
                }
            })
        }
    }

    getTodos = async () => {
        console.log('getting todos...');
        try {
            await todoService.getTodos()
        } catch (error) {
            console.error('Error getting todos:', error);
        }
    }

    addTodo = (event) => {
        event.preventDefault()
        console.log('Adding todo...');
        const form = event.target
        console.log('Form data:', form);
        const todoData = { description: form.description.value }
        console.log('Todo data:', todoData);
        todoService.addTodo(todoData)
        form.reset()
    }

    toggleTodoStatus = (todoId) => {
        todoService.toggleTodoStatus(todoId)
    }

    deleteTodo = (todoId) => {
        todoService.deleteTodo(todoId)
    }

    drawTodos = () => {
        const todos = AppState.todos
        const todosElem = document.getElementById('todos')
        let template = ''

        todos.forEach(todo => {
            template += `
                <li class="${todo.completed ? 'completed' : ''}">
                    <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                        onclick="app.todoController.toggleTodoStatus('${todo.id}')">
                    ${todo.description}
                    <button onclick="app.todoController.deleteTodo('${todo.id}')">X</button>
                </li>
            `
        })

        todosElem.innerHTML = template
    }
}
