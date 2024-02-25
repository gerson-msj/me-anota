import BaseViewModel from "../../base.viewmodel.js";
export default class CriarViewModel extends BaseViewModel {
    _voltar;
    _nomeBloco;
    get nomeBloco() { return this._nomeBloco.value; }
    _verificar;
    _divSenha;
    _resultadoVerificacao;
    set resultadoVerificacao(value) { this._resultadoVerificacao.innerText = value; }
    _senha;
    _senhaConfirmacao;
    _criar;
    onVerificar = () => { };
    onVoltar = () => { };
    onCriar = () => { };
    constructor(shadow) {
        super(shadow);
        this._voltar = this.getElement("voltar");
        this._nomeBloco = this.getElement("nome");
        this._verificar = this.getElement("verificar");
        this._divSenha = this.getElement("divSenha");
        this._resultadoVerificacao = this.getElement("resultadoVerificacao");
        this._senha = this.getElement("senha");
        this._senhaConfirmacao = this.getElement("senhaConfirmacao");
        this._criar = this.getElement("criar");
        this.definirEventos();
    }
    token() {
        return this.criarToken(this._nomeBloco.value, this._senha.value);
    }
    ;
    exibirSenha(exibir) {
        this._nomeBloco.disabled = exibir;
        if (exibir) {
            this._divSenha.classList.remove("ocultar");
            this._verificar.classList.add("ocultar");
        }
        else {
            this._divSenha.classList.add("ocultar");
            this._verificar.classList.remove("ocultar");
        }
    }
    definirEventos() {
        this._voltar.addEventListener("click", (ev) => {
            this.onVoltar();
            ev.preventDefault;
        });
        this._nomeBloco.addEventListener("keyup", () => this._verificar.disabled = this._nomeBloco.value == "");
        this._verificar.addEventListener("click", () => this.onVerificar());
        this._senha.addEventListener("keyup", () => this.desativarCriar());
        this._senhaConfirmacao.addEventListener("keyup", () => this.desativarCriar());
        this._criar.addEventListener("click", () => this.onCriar());
    }
    desativarCriar() {
        this._criar.disabled = this._senha.value === "" || this._senha.value !== this._senhaConfirmacao.value;
    }
}
//# sourceMappingURL=criar.viewmodel.js.map