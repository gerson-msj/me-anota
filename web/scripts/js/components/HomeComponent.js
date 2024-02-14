import BaseComponent from "./BaseComponent.js";
export default class HomeComponent extends BaseComponent {
    abrir = null;
    criar = null;
    constructor() {
        super("home");
    }
    initialize() {
        this.abrir = this.shadow.querySelector("#abrir");
        this.criar = this.shadow.querySelector("#criar");
        this.abrir.onclick = () => {
            this.dispatchEvent(new Event("abrir"));
            return false;
        };
        this.criar.onclick = () => {
            this.dispatchEvent(new Event("criar"));
            return false;
        };
    }
}
//# sourceMappingURL=HomeComponent.js.map