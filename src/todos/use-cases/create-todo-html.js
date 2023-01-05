/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHTML = (todo) => {
    if (!todo) throw new Error('Todo is required')

    const { id, description, done } = todo;

    const html =
        `
            <div class="view">
                <input class="toggle" type="checkbox" ${done ? 'checked' : ''}>
                <label>${description}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        `
    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', id);
    done ? liElement.classList.add('completed') : null;
    return liElement;
}