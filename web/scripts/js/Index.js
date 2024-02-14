import CriarComponent from "./Components/CriarComponent.js";
import AbrirComponent from "./Components/AbrirComponent.js";
import HeaderComponent from "./Components/HeaderComponent.js";
import HomeComponent from "./Components/HomeComponent.js";
{
    const divComponent = document.querySelector("#divComponent");
    let currComponent = null;
    function main() {
        customElements.define("header-component", HeaderComponent);
        customElements.define("home-component", HomeComponent);
        customElements.define("abrir-component", AbrirComponent);
        customElements.define("criar-component", CriarComponent);
        nav();
        addEventListener("popstate", () => nav());
    }
    function nav() {
        if (location.pathname == "/Abrir")
            loadAbrir();
        else if (location.pathname == "/Criar")
            loadCriar();
        else
            loadHome();
    }
    function loadHome() {
        const component = document.createElement("home-component");
        component.addEventListener("abrir", () => loadAbrir());
        component.addEventListener("criar", () => loadCriar());
        definirComponente(component, "/");
    }
    function loadAbrir() {
        definirComponente("abrir-component", "/Abrir");
    }
    function loadCriar() {
        definirComponente("criar-component", "/Criar");
    }
    function definirComponente(component, url) {
        const htmlComponent = typeof component === "string" ? document.createElement(component) : component;
        currComponent?.remove();
        currComponent = htmlComponent;
        divComponent.appendChild(currComponent);
        history.pushState(null, "", url);
    }
    main();
}
//# sourceMappingURL=Index.js.map