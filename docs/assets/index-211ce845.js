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
</footer>`;let w;const C=new Uint8Array(16);function S(){if(!w&&(w=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!w))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return w(C)}const s=[];for(let e=0;e<256;++e)s.push((e+256).toString(16).slice(1));function E(e,t=0){return(s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]).toLowerCase()}const P=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),T={randomUUID:P};function k(e,t,i){if(T.randomUUID&&!t&&!e)return T.randomUUID();e=e||{};const d=e.random||(e.rng||S)();if(d[6]=d[6]&15|64,d[8]=d[8]&63|128,t){i=i||0;for(let o=0;o<16;++o)t[i+o]=d[o];return t}return E(d)}class g{constructor(t){this.id=k(),this.description=t,this.done=!1,this.createdAt=new Date}}const a={All:"all",Completed:"completed",Pending:"pending"},l={todos:[new g("Piedra del alma"),new g("Piedra del infinito"),new g("Piedra del tiempo"),new g("Piedra del corcho")],filter:a.All},I=()=>{v(),console.log("Init store 🚀")},v=()=>{const e=localStorage.getItem("state");if(!e)return;const{todos:t=[],filter:i=a.all}=JSON.parse(e);l.todos=t,l.filter=i},f=()=>{localStorage.setItem("state",JSON.stringify(l))},A=(e=a.All)=>{switch(e){case a.All:return[...l.todos];case a.Completed:return[...l.todos].filter(t=>t.done);case a.Pending:return[...l.todos].filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid.`)}},U=e=>{if(!e)throw new Error("Description is required");l.todos.push(new g(e)),f()},q=e=>{l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),f()},x=e=>{if(!e)throw new Error("Todo id is required");l.todos=l.todos.filter(t=>t.id!==e),f()},M=()=>{l.todos=l.todos.filter(e=>!e.done),f()},N=(e=a.all)=>{if(!Object.values(a).includes(e))throw new Error(`Option ${e} is not valid.`);l.filter=e,f()},O=()=>l.filter,c={initStore:I,loadStore:v,addTodo:U,toggleTodo:q,deleteTodo:x,deleteCompleted:M,setFilter:N,getCurrentFilter:O,getTodos:A};let h;const D=(e,t=[])=>{if(h||(h=document.querySelector(e)),!h)throw new Error("Element not found");h.innerHTML="",t.forEach(i=>{h.append(F(i))})},F=e=>{if(!e)throw new Error("Todo is required");const{id:t,description:i,done:d}=e,o=`
            <div class="view">
                <input class="toggle" type="checkbox" ${d?"checked":""}>
                <label>${i}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        `,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",t),d&&n.classList.add("completed"),n};let b;const H=e=>{if(b||(b=document.querySelector(e)),!b)throw new Error("Element not found");b.innerHTML=c.getTodos(a.Pending).length},p={TodoList:".todo-list",NewTodoInput:"#new-todo-input",clearCompleted:".clear-completed",TodoFilters:".filtro",TodoCount:".todo-count",PendingCountLabel:"#pending-count"},V=e=>{const t=()=>{const r=c.getTodos(c.getCurrentFilter());D(p.TodoList,r),i()},i=()=>{H(p.PendingCountLabel)};(()=>{const r=document.createElement("div");r.innerHTML=L,document.querySelector(e).append(r),t()})();const d=document.querySelector(p.NewTodoInput),o=document.querySelector(p.TodoList),n=document.querySelector(p.clearCompleted),u=document.querySelectorAll(p.TodoFilters);d.addEventListener("keyup",r=>{if(r.keyCode===13){if(r.target.value.trim().length===0){alert("You must enter a description");return}c.addTodo(r.target.value.trim()),t(),r.target.value=""}}),o.addEventListener("click",r=>{if(r.target.className!=="toggle")return;const m=r.target.closest("[data-id]").getAttribute("data-id");c.toggleTodo(m),t()}),o.addEventListener("click",r=>{if(r.target.className!=="destroy")return;const m=r.target.closest("[data-id]").getAttribute("data-id");c.deleteTodo(m),t()}),n.addEventListener("click",()=>{c.deleteCompleted(),t()}),u.forEach(r=>{r.addEventListener("click",y=>{switch(u.forEach(m=>m.classList.remove("selected")),y.target.classList.add("selected"),y.target.textContent){case"Todos":c.setFilter(a.All);break;case"Pendientes":c.setFilter(a.Pending);break;case"Completados":c.setFilter(a.Completed);break}t()})})};c.initStore();V("#app");
