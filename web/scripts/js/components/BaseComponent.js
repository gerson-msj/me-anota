export default class BaseComponent extends HTMLElement {
    shadow = this.attachShadow({ mode: "closed" });
    modelPath;
    stylePath;
    constructor(path, model, style) {
        super();
        this.modelPath = `${path}${model}`;
        this.stylePath = `${path}${style}`;
    }
    async connectedCallback() {
        await this.initializeElement();
    }
    async initializeElement() {
        await Promise.all([
            this.initializeStyle(),
            this.initializeModel()
        ]);
        await this.initialize();
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
        const requestStyle = await fetch(this.stylePath);
        const style = await requestStyle.text();
        const sheet = new CSSStyleSheet();
        await sheet.replace(style);
        this.shadow.adoptedStyleSheets = [sheet];
    }
}
//# sourceMappingURL=BaseComponent.js.map