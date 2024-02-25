import BaseViewModel from "../../base.viewmodel.js";

export default class CriarViewModel extends BaseViewModel {

    private _voltar: HTMLAnchorElement;

    private _nomeBloco: HTMLInputElement;
    public get nomeBloco() { return this._nomeBloco.value; }

    private _verificar: HTMLButtonElement;
    private _divSenha: HTMLDivElement;

    private _resultadoVerificacao: HTMLParagraphElement;
    public set resultadoVerificacao(value: string) { this._resultadoVerificacao.innerText = value; }

    private _senha: HTMLInputElement;
    
    private _senhaConfirmacao: HTMLInputElement;
    private _criar: HTMLButtonElement;

    public onVerificar = () => {};
    public onVoltar = () => {};
    public onCriar = () => {};

    constructor(shadow: ShadowRoot) {
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

    public token(): Promise<string> { 
        return this.criarToken(this._nomeBloco.value, this._senha.value); 
    };

    public exibirSenha(exibir: boolean) {

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

    private definirEventos() {

        this._voltar.addEventListener("click", (ev: MouseEvent) => {
            this.onVoltar();
            ev.preventDefault;
        });

        this._nomeBloco.addEventListener("keyup", () => this._verificar.disabled = this._nomeBloco.value == "");

        this._verificar.addEventListener("click", () => this.onVerificar());

        this._senha.addEventListener("keyup", () => this.desativarCriar());
        this._senhaConfirmacao.addEventListener("keyup", () => this.desativarCriar());

        this._criar.addEventListener("click", () => this.onCriar());
    }

    private desativarCriar() {
        this._criar.disabled = this._senha.value === "" || this._senha.value !== this._senhaConfirmacao.value;
    }
}