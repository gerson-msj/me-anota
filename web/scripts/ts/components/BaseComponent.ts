export default abstract class BaseComponent extends HTMLElement {

    protected shadow = this.attachShadow({mode: "closed"});

    private modelPath: string;
    private stylePath: string;

    abstract initialize(): Promise<void>;

    constructor(path: string, model: string, style: string) {
        super();
        
        this.modelPath = `${path}${model}`;
        this.stylePath = `${path}${style}`;
    }

    async connectedCallback() {
        await this.initializeElement();
    }

    private async initializeElement() {
        await Promise.all([
            this.initializeStyle(),
            this.initializeModel()
        ]);

        await this.initialize();
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