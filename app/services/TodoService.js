import { Todo } from "../models/Todo.js";
import { api } from "./AxiosService.js";
import { AppState } from "../AppState.js";

class TodoService {

    async addTodo(todoData) {
        const newTodoData = {
            description: todoData.description,
            completed: false
        };
        const res = await api.post('/api/todos', newTodoData)
        console.log("API response for todos:", res.data);
        AppState.todos.push(new Todo(res.data))
        AppState.emit('todos')
    }

    async getTodos() {
        try {
            const res = await api.get('/api/todos')
            AppState.todos = res.data.map(todoData => new Todo(todoData))
            AppState.emit('todos')
            console.log("API response for todos:", res.data);
        } catch (error) {
            console.error('Unable to get todos:', error);
        }
    }

    async toggleTodoStatus(todoId) {
        // REVIEW need some console logs in here to verify each lines function
        // this may function as intended but un clear right now
        const todo = AppState.todos.find(t => t.id === todoId)
        const updatedTodoData = {
            completed: !todo.completed
        };
        await api.post(`/api/todos/${todoId}`, updatedTodoData)
        todo.completed = !todo.completed
        AppState.emit('todos')
    }

    // REVIEW need to review this code with some console logs
    // check the lines and make sure they are doing what you expect them too
    // whats our response from the the api?
    async deleteTodo(todoId) {
        try {
            await api.delete(`/api/todos/${todoId}`)
            AppState.todos = AppState.todos.filter(t => t.id !== todoId)
            AppState.emit('todos')
        } catch (error) {
            console.error('Unable to delete todo:', error);
        }
    }

}

export const todoService = new TodoService()
