import BaseService from "../Services/BaseService.js";
import BaseViewModel from "../ViewModels/BaseViewModel.js";

export default abstract class BaseComponent<TService extends BaseService, TViewModel extends BaseViewModel> extends HTMLElement {

    private shadow = this.attachShadow({ mode: "closed" });

    private _service: TService | null = null;
    protected get service() { return this._service! }

    private _viewModel: TViewModel | null = null;
    protected get viewModel() { return this._viewModel!; }
    
    private modelPath: string;
    private styles: string[];

    abstract initialize(): void;

    constructor(componentName: string) {
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

    private async initializeElement() {
        await Promise.all([
            this.initializeStyle(),
            this.initializeModel()
        ]);

        this.initialize();
    }

    private async initializeModel() {
        const requestModel = await fetch(this.modelPath);
        const model = await requestModel.text();
        const modelTemplate = document.createElement("div");
        modelTemplate.innerHTML = model;
        const template = modelTemplate.querySelector("template") as HTMLTemplateElement;
        this.shadow.appendChild(template.content.cloneNode(true));
    }

    private async initializeStyle() {
        const requestsStyle = this.styles.map(s => fetch(s));
        const resultsStyle = await Promise.all(requestsStyle);
        const requestsText = resultsStyle.map(r => r.text());
        const resultsText = await Promise.all(requestsText);
        const requestsSheet = resultsText.map(t => (new CSSStyleSheet()).replace(t));
        const resultsSheet = await Promise.all(requestsSheet);

        this.shadow.adoptedStyleSheets = resultsSheet;
    }

    protected getElement<T>(name: string): T {
        return this.shadow.querySelector(`#${name}`) as T;
    }

    protected initializeService(service: new() => TService) {
        this._service = new service();
    }

    protected initializeViewModel(viewModel: new(shadow: ShadowRoot) => TViewModel) {
        this._viewModel = new viewModel(this.shadow);
    }
}