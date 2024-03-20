import BaseViewModel from "../../base.viewmodel.js";

export default class AnotacoesViewModel extends BaseViewModel {

    private _sair: HTMLAnchorElement;

    public onSair = () => {};

    constructor(shadow: ShadowRoot) {
        super(shadow);

        this._sair = this.getElement("sair");
        this._sair.addEventListener("click", ev => {
            ev.preventDefault();
            this.onSair();
            
        });

    }
    
}