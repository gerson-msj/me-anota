export default abstract class BaseComponent extends HTMLElement {

    protected shadow = this.attachShadow({mode: "closed"});

    private modelPath: string;
    private stylePath: string;

    abstract initialize(): void;

    constructor(componentName: string) {
        super();
        
        this.modelPath = `/components/${componentName}/${componentName}.model.html`;
        this.stylePath = `/components/${componentName}/${componentName}.style.css`;
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
        const requestStyle = await fetch(this.stylePath);
        const style = await requestStyle.text();
        const sheet = new CSSStyleSheet();
        await sheet.replace(style);
        this.shadow.adoptedStyleSheets = [sheet];
    }

}