export default class BaseComponent extends HTMLElement {
    shadow = this.attachShadow({ mode: "closed" });
    _service = null;
    get service() { return this._service; }
    _viewModel = null;
    get viewModel() { return this._viewModel; }
    modelPath;
    styles;
    constructor(componentName) {
        super();
        this.modelPath = `/components/${componentName}/${componentName}.model.html`;
        this.styles = [
            "/styles/dark.css",
            "/styles/form.css",
            "/styles/main.css",
            `/components/${componentName}/${componentName}.style.css`
        ];
    }
    async connectedCallback() {
        await this.initializeElement();
    }
    async initializeElement() {
        await Promise.all([
            this.initializeStyle(),
            this.initializeModel()
        ]);
        this.initialize();
    }
    async initializeModel() {
        const requestModel = await fetch(this.modelPath);
        const model = await requestModel.text();
        const modelTemplate = document.createElement("div");
        modelTemplate.innerHTML = model;
        const template = modelTemplate.querySelector("template");
        this.shadow.appendChild(template.content.cloneNode(true));
    }
    async initializeStyle() {
        const requestsStyle = this.styles.map(s => fetch(s));
        const resultsStyle = await Promise.all(requestsStyle);
        const requestsText = resultsStyle.map(r => r.text());
        const resultsText = await Promise.all(requestsText);
        const requestsSheet = resultsText.map(t => (new CSSStyleSheet()).replace(t));
        const resultsSheet = await Promise.all(requestsSheet);
        this.shadow.adoptedStyleSheets = resultsSheet;
    }
    getElement(name) {
        return this.shadow.querySelector(`#${name}`);
    }
    initializeService(service) {
        this._service = new service();
    }
    initializeViewModel(viewModel) {
        this._viewModel = new viewModel(this.shadow);
    }
}
//# sourceMappingURL=BaseComponent.js.map