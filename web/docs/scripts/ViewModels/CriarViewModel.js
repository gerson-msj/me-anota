import BaseViewModel from "./BaseViewModel.js";
export default class CriarViewModel extends BaseViewModel {
    _voltar;
    _nome;
    get nome() { return this._nome.value; }
    _verificar;
    _divSenha;
    _resultadoVerificacao;
    set resultadoVerificacao(value) { this._resultadoVerificacao.innerText = value; }
    _senha;
    get senha() { return this._senha.value; }
    _senhaConfirmacao;
    _criar;
    onVerificar = () => { };
    onVoltar = () => { };
    onCriar = () => { };
    constructor(shadow) {
        super(shadow);
        this._voltar = this.getElement("voltar");
        this._nome = this.getElement("nome");
        this._verificar = this.getElement("verificar");
        this._divSenha = this.getElement("divSenha");
        this._resultadoVerificacao = this.getElement("resultadoVerificacao");
        this._senha = this.getElement("senha");
        this._senhaConfirmacao = this.getElement("senhaConfirmacao");
        this._criar = this.getElement("criar");
        this.definirEventos();
    }
    exibirSenha(exibir) {
        this._nome.disabled = exibir;
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
        this._nome.addEventListener("keyup", () => this._verificar.disabled = this._nome.value == "");
        this._verificar.addEventListener("click", () => this.onVerificar());
        this._senha.addEventListener("keyup", () => this.desativarCriar());
        this._senhaConfirmacao.addEventListener("keyup", () => this.desativarCriar());
        this._criar.addEventListener("click", () => this.onCriar());
    }
    desativarCriar() {
        this._criar.disabled = this._senha.value === "" || this._senha.value !== this._senhaConfirmacao.value;
    }
}
//# sourceMappingURL=CriarViewModel.js.map