import HeaderComponent from "./components/header/header.component.js";
import HomeComponent from "./components/home/home.component.js";
import CriarComponent from "./components/criar/criar.component.js";
import AbrirComponent from "./components/abrir/abrir.component.js";
import AnotacoesComponent from "./components/anotacoes/anotacoes.component.js";
{
    const mainElement = document.querySelector("main");
    const loadedComponents = [];
    let currentComponent = null;
    function main() {
        customElements.define("header-component", HeaderComponent);
        nav();
        addEventListener("popstate", () => nav());
    }
    function nav() {
        if (location.pathname == "/abrir")
            loadAbrir();
        else if (location.pathname == "/criar")
            loadCriar();
        else
            loadHome();
    }
    function loadHome() {
        const component = loadComponent("home-component", "/", HomeComponent);
        component.addEventListener("abrir", () => loadAbrir());
        component.addEventListener("criar", () => loadCriar());
    }
    function loadAbrir() {
        const component = loadComponent("abrir-component", "/abrir", AbrirComponent);
        component.addEventListener("voltar", () => loadHome());
    }
    function loadCriar() {
        const component = loadComponent("criar-component", "/criar", CriarComponent);
        component.addEventListener("voltar", () => loadHome());
        component.addEventListener("abrirAnotacoes", (ev) => {
            const token = ev.detail;
            loadAnotacoes(token);
        });
    }
    function loadAnotacoes(token) {
        const component = loadComponent("anotacoes-component", "/anotacoes", AnotacoesComponent);
        component.addEventListener("sair", () => loadHome());
        component.dispatchEvent(new CustomEvent("initializeToken", { detail: token }));
    }
    function loadComponent(name, url, constructor) {
        if (!loadedComponents.includes(name)) {
            customElements.define(name, constructor);
            loadedComponents.push(name);
        }
        currentComponent?.remove();
        currentComponent = document.createElement(name);
        mainElement.appendChild(currentComponent);
        if (location.pathname !== url)
            history.pushState(null, "", url);
        return currentComponent;
    }
    main();
}
//# sourceMappingURL=index.js.map