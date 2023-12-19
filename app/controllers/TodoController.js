import { todoService } from "../services/TodoService.js";
import { AppState } from "../AppState.js";

export class TodoController {
    constructor() {
        console.log('TodoController starting');

        AppState.on('todos', () => this.drawTodos());

        if (AppState.user) {
            this.getTodos();
        } else {
            AppState.on('account', () => {
                if (AppState.account) {
                    this.getTodos();
                }
            });
        }
    }

    async getTodos() {
        console.log('Getting todos...');
        try {
            await todoService.getTodos();
        } catch (error) {
            console.error('Error getting todos:', error);
        }
    }

    async addTodo(event) {
        event.preventDefault();
        console.log('Adding todo...');

        const form = event.target;
        console.log('Form data:', form);

        const todoData = { description: form.description.value };
        console.log('Todo data:', todoData);

        try {
            await todoService.addTodo(todoData);
            form.reset();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    }

    async toggleTodoStatus(todoId) {
        console.log(`Toggling status for todoId: ${todoId}`);
        try {
            await todoService.toggleTodoStatus(todoId);
            console.log('Todo status toggled successfully.');
        } catch (error) {
            console.error('Error toggling todo status:', error);
        }
    }

    async deleteTodo(todoId) {
        console.log(`Deleting todo with ID: ${todoId}`);
        try {
            await todoService.deleteTodo(todoId);
            console.log('Todo deleted successfully.');
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }


    drawTodos() {
        const todos = AppState.todos;
        const todosElem = document.getElementById('todos');
        let template = '';

        todos.forEach(todo => {
            template += todo.getTodoTemplate();
        })

        todosElem.innerHTML = template;

        // Count uncompleted tasks and render
        const uncompletedTasks = todos.filter(todo => !todo.completed).length;
        const todoCountElem = document.getElementById('todo-count');
        todoCountElem.textContent = `${uncompletedTasks} left`;
    }
}
