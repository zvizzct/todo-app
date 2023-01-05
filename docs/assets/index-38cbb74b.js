(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&d(u)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();const L=`<section class="todoapp">
    <header class="header">
        <h1>Tareas</h1>
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>
    </header>

    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            <!-- These are here just to show the structure of the list items -->
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->
            <!-- <li class="completed" data-id="abc">
                <div class="view">
                    <input class="toggle" type="checkbox" checked>
                    <label>Probar JavaScript</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            </li> -->
            <!-- <li>
                <div class="view">
                    <input class="toggle" type="checkbox">
                    <label>Comprar un unicornio</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Rule the web">
            </li> -->
        </ul>
    </section>

    <!-- This footer should hidden by default and shown when there are todos -->
    <footer class="footer">
        <!-- This should be "0 items left" by default -->
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
            <li>
                <a class="selected filtro" class="selected" href="#/">Todos</a>
            </li>
            <li>
                <a class="filtro" href="#/active">Pendientes</a>
            </li>
            <li>
                <a class="filtro" href="#/completed">Completados</a>
            </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed">Borrar completados</button>
    </footer>
</section>


<footer class="info">
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
    <!-- Change this out with your name and url ↓ -->
    <p>Creado por <a href="http://todomvc.com">ti</a></p>
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>
</footer>`;let y;const C=new Uint8Array(16);function S(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(C)}const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function E(e,t=0){return(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase()}const k=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),T={randomUUID:k};function I(e,t,i){if(T.randomUUID&&!t&&!e)return T.randomUUID();e=e||{};const d=e.random||(e.rng||S)();if(d[6]=d[6]&15|64,d[8]=d[8]&63|128,t){i=i||0;for(let o=0;o<16;++o)t[i+o]=d[o];return t}return E(d)}class b{constructor(t){this.id=I(),this.description=t,this.done=!1,this.createdAt=new Date}}const a={All:"all",Completed:"completed",Pending:"pending"},l={todos:[new b("Estudiar React"),new b("Hacer la compra"),new b("Ir al gimnasio")],filter:a.All},P=()=>{v(),console.log("Init store 🚀")},v=()=>{const e=localStorage.getItem("state");if(!e)return;const{todos:t=[],filter:i=a.all}=JSON.parse(e);l.todos=t,l.filter=i},g=()=>{localStorage.setItem("state",JSON.stringify(l))},A=(e=a.All)=>{switch(e){case a.All:return[...l.todos];case a.Completed:return[...l.todos].filter(t=>t.done);case a.Pending:return[...l.todos].filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid.`)}},U=e=>{if(!e)throw new Error("Description is required");l.todos.push(new b(e)),g()},q=e=>{l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),g()},x=e=>{if(!e)throw new Error("Todo id is required");l.todos=l.todos.filter(t=>t.id!==e),g()},M=()=>{l.todos=l.todos.filter(e=>!e.done),g()},N=(e=a.all)=>{if(!Object.values(a).includes(e))throw new Error(`Option ${e} is not valid.`);l.filter=e,g()},O=()=>l.filter,c={initStore:P,loadStore:v,addTodo:U,toggleTodo:q,deleteTodo:x,deleteCompleted:M,setFilter:N,getCurrentFilter:O,getTodos:A};let h;const D=(e,t=[])=>{if(h||(h=document.querySelector(e)),!h)throw new Error("Element not found");h.innerHTML="",t.forEach(i=>{h.append(F(i))})},F=e=>{if(!e)throw new Error("Todo is required");const{id:t,description:i,done:d}=e,o=`
            <div class="view">
                <input class="toggle" type="checkbox" ${d?"checked":""}>
                <label>${i}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        `,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",t),d&&n.classList.add("completed"),n};let w;const H=e=>{if(w||(w=document.querySelector(e)),!w)throw new Error("Element not found");w.innerHTML=c.getTodos(a.Pending).length},p={TodoList:".todo-list",NewTodoInput:"#new-todo-input",clearCompleted:".clear-completed",TodoFilters:".filtro",TodoCount:".todo-count",PendingCountLabel:"#pending-count"},R=e=>{const t=()=>{const s=c.getTodos(c.getCurrentFilter());D(p.TodoList,s),i()},i=()=>{H(p.PendingCountLabel)};(()=>{const s=document.createElement("div");s.innerHTML=L,document.querySelector(e).append(s),t()})();const d=document.querySelector(p.NewTodoInput),o=document.querySelector(p.TodoList),n=document.querySelector(p.clearCompleted),u=document.querySelectorAll(p.TodoFilters);d.addEventListener("keyup",s=>{if(s.keyCode===13){if(s.target.value.trim().length===0){alert("You must enter a description");return}c.addTodo(s.target.value.trim()),t(),s.target.value=""}}),o.addEventListener("click",s=>{if(s.target.className!=="toggle")return;const m=s.target.closest("[data-id]").getAttribute("data-id");c.toggleTodo(m),t()}),o.addEventListener("click",s=>{if(s.target.className!=="destroy")return;const m=s.target.closest("[data-id]").getAttribute("data-id");c.deleteTodo(m),t()}),n.addEventListener("click",()=>{c.deleteCompleted(),t()}),u.forEach(s=>{s.addEventListener("click",f=>{switch(u.forEach(m=>m.classList.remove("selected")),f.target.classList.add("selected"),f.target.textContent){case"Todos":c.setFilter(a.All);break;case"Pendientes":c.setFilter(a.Pending);break;case"Completados":c.setFilter(a.Completed);break}t()})})};c.initStore();R("#app");
