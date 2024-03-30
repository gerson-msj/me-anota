import BaseViewModel from "../../base.viewmodel.js";
export default class AnotacoesViewModel extends BaseViewModel {
    _sair;
    _nome;
    onSair = () => { };
    constructor(shadow) {
        super(shadow);
        this._sair = this.getElement("sair");
        this._sair.addEventListener("click", ev => {
            ev.preventDefault();
            this.onSair();
        });
        this._nome = this.getElement("nome");
    }
    apresentar(blocoNotas) {
        console.log("anotacoes.apresentar: ", blocoNotas.bloco.nome);
        this._nome.innerText = blocoNotas.bloco.nome;
    }
}
//# sourceMappingURL=anotacoes.viewmodel.js.map