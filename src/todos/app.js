import html from './app.html?raw'
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases'

const elementIds = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    clearCompleted: '.clear-completed',
    TodoFilters: '.filtro',
    TodoCount: '.todo-count',
    PendingCountLabel: '#pending-count'
}
/**
 * 
 * @param {String} elementId id of the element to render the app into
 */


export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(elementIds.TodoList, todos)
        updatePendingCount()
    }

    const updatePendingCount = () => {
        renderPending(elementIds.PendingCountLabel);
    }


    (() => {
        const app = document.createElement('div');
        app.innerHTML = html
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    // HTML References 
    const newDescriptionInput = document.querySelector(elementIds.NewTodoInput);
    const todoListUL = document.querySelector(elementIds.TodoList);
    const clearCompletedButton = document.querySelector(elementIds.clearCompleted)
    const filtersLIs = document.querySelectorAll(elementIds.TodoFilters)

    // Handlers
    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) {
            alert('You must enter a description');
            return;
        }
        todoStore.addTodo(event.target.value.trim());
        displayTodos();
        event.target.value = '';
    })
    todoListUL.addEventListener('click', (event) => {
        if (event.target.className !== 'toggle') {
            return;
        }
        const element = event.target.closest('[data-id]');
        const todoId = element.getAttribute('data-id');
        todoStore.toggleTodo(todoId);
        displayTodos();
    })

    todoListUL.addEventListener('click', (event) => {
        if (event.target.className !== 'destroy') {
            return;
        }
        const element = event.target.closest('[data-id]');
        const todoId = element.getAttribute('data-id');
        todoStore.deleteTodo(todoId)
        displayTodos();
    })

    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompleted()
        displayTodos();
    })

    filtersLIs.forEach(element => {
        element.addEventListener('click', (element) => {
            filtersLIs.forEach(e => e.classList.remove('selected'))
            element.target.classList.add('selected');

            switch (element.target.textContent) {
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                    break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed);
                    break;
            }
            displayTodos();
        });
    });


}

