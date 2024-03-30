import BaseViewModel from "../../base.viewmodel.js";
import BlocoNotasModel from "../../models/bloco.notas.model.js";

export default class AnotacoesViewModel extends BaseViewModel {

    private _sair: HTMLAnchorElement;
    private _nome: HTMLHeadingElement;

    public onSair = () => {};

    constructor(shadow: ShadowRoot) {
        super(shadow);

        this._sair = this.getElement("sair");
        this._sair.addEventListener("click", ev => {
            ev.preventDefault();
            this.onSair();
            
        });

        

        this._nome = this.getElement("nome");

        

    }

    public apresentar(blocoNotas: BlocoNotasModel) {
        console.log("anotacoes.apresentar: ", blocoNotas.bloco.nome);
        this._nome.innerText = blocoNotas.bloco.nome;
    }
    
}