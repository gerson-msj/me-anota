import BaseViewModel from "./BaseViewModel.js";

export default class HomeViewModel extends BaseViewModel {

    private abrir: HTMLAnchorElement;
    private criar: HTMLAnchorElement;

    public onAbrir = () => {};
    public onCriar = () => {};

    constructor(shadow: ShadowRoot) {
        super(shadow);

        this.abrir = this.getElement("abrir");
        this.criar = this.getElement("criar");
        
        this.abrir.addEventListener("click", (ev) => {
            ev.preventDefault();
            this.onAbrir();
        });

        this.criar.addEventListener("click", (ev) => {
            ev.preventDefault();
            this.onCriar();
        });
        
    }
    
}