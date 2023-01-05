import { Todo } from "../todos/models/todo.model";

export const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
}
const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del corcho')
    ],
    filter: Filters.All
}

const initStore = () => {
    loadStore()
    console.log('Init store 🚀');
}

const loadStore = () => {
    const stateStorage = localStorage.getItem('state')
    if (!stateStorage) return;
    const { todos = [], filter = Filters.all } = JSON.parse(stateStorage)
    state.todos = todos
    state.filter = filter
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state))
}

/**
 * Get todos from the store filtered.
 * @param {Filter} filter Filter to apply to the todos.
 * @returns {Todo[]} Todos filtered.
 * @throws {Error} If the option provided is not a valid filter.
 */
const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return [...state.todos].filter(todo => todo.done);
        case Filters.Pending:
            return [...state.todos].filter(todo => !todo.done);
        default:
            throw new Error(`Option ${filter} is not valid.`)
    }
}

/**
 * Add a new todo to the store.
 * @param {string} description Description of the new todo.
 * @throws {Error} If the description is not provided.
 */
const addTodo = (description) => {
    if (!description) throw new Error('Description is required')
    state.todos.push(new Todo(description))
    saveStateToLocalStorage();
}

/**
 * Toggle the done status of a todo.
 * @param {number} todoId Id of the todo to toggle.
 * @throws {Error} If the todo id is not provided.
 */
const toggleTodo = (todoId) => {

    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo
    })
    saveStateToLocalStorage();
}

/**
 * Delete a todo from the store.
 * @param {number} todoId Id of the todo to delete.
 * @throws {Error} If the todo id is not provided.
 */
const deleteTodo = (todoId) => {
    if (!todoId) throw new Error('Todo id is required')
    state.todos = state.todos.filter(todo => todo.id !== todoId)
    saveStateToLocalStorage();
}

/**
 * Delete all completed todos from the store.
 */
const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done)

    saveStateToLocalStorage();

}

/**
 * Set a new filter for the todos.
 * @param {Filter} newFilter New filter to apply.
 * @throws {Error} If the option provided is not a valid filter.
 */
const setFilter = (newFilter = Filters.all) => {
    if (!Object.values(Filters).includes(newFilter)) throw new Error(`Option ${newFilter} is not valid.`)
    state.filter = newFilter;
    saveStateToLocalStorage();
}

/**
 * Get the current filter of the todos.
 * @returns {Filter} Current filter.
 */
const getCurrentFilter = () => {
    return state.filter;
}

export default {
    initStore,
    loadStore,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
    getTodos,
}