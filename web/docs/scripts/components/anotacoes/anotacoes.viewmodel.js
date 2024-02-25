import BaseViewModel from "../../base.viewmodel.js";
export default class AnotacoesViewModel extends BaseViewModel {
    _sair;
    onSair = () => { };
    constructor(shadow) {
        super(shadow);
        this._sair = this.getElement("sair");
        this._sair.addEventListener("click", ev => {
            ev.preventDefault();
            this.onSair();
        });
    }
}
//# sourceMappingURL=anotacoes.viewmodel.js.map