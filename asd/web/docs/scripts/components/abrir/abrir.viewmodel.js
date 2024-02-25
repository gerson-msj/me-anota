import BaseViewModel from "../../base.viewmodel.js";
export default class AbrirViewModel extends BaseViewModel {
    _voltar;
    _nomeBloco;
    _senha;
    _abrir;
    _resultado;
    get nomeBloco() { return this._nomeBloco.value; }
    set resultado(value) { this._resultado.innerText = value; }
    onVoltar = () => { };
    onAbrir = () => { };
    constructor(shadow) {
        super(shadow);
        this._voltar = this.getElement("voltar");
        this._nomeBloco = this.getElement("nomeBloco");
        this._senha = this.getElement("senha");
        this._abrir = this.getElement("abrir");
        this._resultado = this.getElement("resultado");
        this._voltar.addEventListener("click", ev => {
            ev.preventDefault();
            this.onVoltar();
        });
        this._nomeBloco.addEventListener("keyup", () => this.permitirAbrir());
        this._senha.addEventListener("keyup", () => this.permitirAbrir());
        this._abrir.addEventListener("click", () => this.onAbrir());
    }
    token() {
        return this.criarToken(this._nomeBloco.value, this._senha.value);
    }
    ;
    permitirAbrir() {
        this._abrir.disabled = this._nomeBloco.value.trim() === "" || this._senha.value.trim() === "";
    }
}
//# sourceMappingURL=abrir.viewmodel.js.map