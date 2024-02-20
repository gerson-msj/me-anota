import CriarComponent from "./Components/CriarComponent.js";
import AbrirComponent from "./Components/AbrirComponent.js";
import HeaderComponent from "./Components/HeaderComponent.js";
import HomeComponent from "./Components/HomeComponent.js";
{
    const divComponent = document.querySelector("#divComponent");
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
    }
    function loadComponent(name, url, constructor) {
        if (!loadedComponents.includes(name)) {
            customElements.define(name, constructor);
            loadedComponents.push(name);
        }
        currentComponent?.remove();
        currentComponent = document.createElement(name);
        divComponent.appendChild(currentComponent);
        history.pushState(null, "", url);
        return currentComponent;
    }
    main();
}
//# sourceMappingURL=Index.js.map