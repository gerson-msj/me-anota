import BaseViewModel from "../../base.viewmodel.js";

export default class AbrirViewModel extends BaseViewModel {

    private _voltar: HTMLAnchorElement;
    private _nomeBloco: HTMLInputElement;
    private _senha: HTMLInputElement;
    private _abrir: HTMLButtonElement;
    private _resultado: HTMLParagraphElement;

    
    public get nomeBloco() {  return this._nomeBloco.value; }
    public set resultado(value: string) { this._resultado.innerText = value; }

    public onVoltar = () => { };
    public onAbrir = () => { };

    constructor(shadow: ShadowRoot) {
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

    public token(): Promise<string> { 
        return this.criarToken(this._nomeBloco.value, this._senha.value); 
    };

    private permitirAbrir() {
        this._abrir.disabled = this._nomeBloco.value.trim() === "" || this._senha.value.trim() === "";
    }

}