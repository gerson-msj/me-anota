import BaseComponent from "../BaseComponent.js";

export default class HeaderComponent extends BaseComponent {
    
    constructor() {
        super("/components/header/", "HeaderComponentModel.html", "HeaderComponentStyle.css");
    }

    async initialize(): Promise<void> {
    }
}