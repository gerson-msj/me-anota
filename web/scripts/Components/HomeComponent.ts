import BaseComponent from "./BaseComponent.js";

export default class HomeComponent extends BaseComponent {
    
    private abrir: HTMLAnchorElement | null = null;
    private criar: HTMLAnchorElement | null = null;

    constructor() {
        super("home");
        
    }    
    
    initialize(): void {
        this.abrir = this.shadow.querySelector("#abrir");
        this.criar = this.shadow.querySelector("#criar");

        this.abrir!.onclick = () => {
            this.dispatchEvent(new Event("abrir"));
            return false;
        };

        this.criar!.onclick = () => {
            this.dispatchEvent(new Event("criar"));
            return false;
        };
    }
}