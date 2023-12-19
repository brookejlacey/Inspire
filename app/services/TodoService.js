import { Todo } from "../models/Todo.js";
import { api } from "./AxiosService.js";
import { AppState } from "../AppState.js";

class TodoService {
    async getTodos() {
        try {
            const res = await api.get('/api/todos')
            AppState.todos = res.data.map(todoData => new Todo(todoData))
            AppState.emit('todos')
            console.log("API response for todos:", res.data)
        } catch (error) {
            console.error('Unable to get todos:', error)
        }
    }

    async addTodo(todoData) {
        try {
            const res = await api.post('/api/todos', todoData)
            const newTodo = new Todo(res.data)
            AppState.todos.push(newTodo)
            AppState.emit('todos')
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    }

    async toggleTodoStatus(todoId) {
        console.log(`Toggling status for todoId: ${todoId}`);
        try {
            const todo = AppState.todos.find(t => t.id === todoId);
            if (todo) {
                const updatedTodoData = {
                    completed: !todo.completed
                };
                const res = await api.put(`/api/todos/${todoId}`, updatedTodoData);
                console.log("API response for toggling status:", res.data);
                todo.completed = !todo.completed;
                AppState.emit('todos');
            } else {
                console.error(`Todo with ID ${todoId} not found.`);
            }
        } catch (error) {
            console.error('Error toggling todo status:', error);
        }
    }


    async deleteTodo(todoId) {
        console.log(`Deleting todo with ID: ${todoId}`);
        try {
            await api.delete(`/api/todos/${todoId}`);
            AppState.todos = AppState.todos.filter(t => t.id !== todoId);
            AppState.emit('todos');
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }
}

export const todoService = new TodoService()
