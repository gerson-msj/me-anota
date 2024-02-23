import HeaderComponent from "./Components/HeaderComponent.js";
import HomeComponent from "./Components/HomeComponent.js";
import CriarComponent from "./Components/CriarComponent.js";
import AbrirComponent from "./Components/AbrirComponent.js";
import AnotacoesComponent from "./Components/AnotacoesComponent.js";
import IUser from "./Interfaces/IUser.js";

{
    const mainElement = document.querySelector("main") as HTMLElement;
    const loadedComponents: string[] = [];
    
    let currentComponent: HTMLElement | null = null;

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
            const user: IUser = (ev as CustomEvent).detail;
            loadAnotacoes(user);
        });
    }

    function loadAnotacoes(user: IUser) {
        const component = loadComponent("anotacoes-component", "/anotacoes", AnotacoesComponent);
        component.addEventListener("sair", () => loadHome());
        component.dispatchEvent(new CustomEvent("initializeUser", { detail: user }));
    }

    function loadComponent(name: string, url: string, constructor: CustomElementConstructor): HTMLElement {

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