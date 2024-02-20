import BaseComponent from "./BaseComponent.js";
import CriarService from "../Services/CriarService.js";

export default class CriarComponent extends BaseComponent {

    private service: CriarService;

    private _nome: HTMLInputElement | null = null;
    private get nome() { return this._nome!; }

    private _verificar: HTMLButtonElement | null = null;
    private get verificar() { return this._verificar!; }

    private _voltar: HTMLAnchorElement | null = null;
    private get voltar() { return this._voltar!; }

    constructor() {
        super("criar");
        this.service = new CriarService();
    }

    initialize(): void {
        this._nome = this.getElement("nome");
        this._verificar = this.getElement("verificar");
        this._voltar = this.getElement("voltar");

        this.nome.addEventListener("keyup", () => this.verificar.disabled = this.nome.value == "");
        
        this.verificar.addEventListener("click", async () => await this.onVerificar());

        this.voltar.addEventListener("click", (ev: MouseEvent) => {
            this.dispatchEvent(new Event("voltar"));
            ev.preventDefault();
        });
    }

    async onVerificar(): Promise<void> {
        try {
            const existe = await this.service.ExisteNota(this.nome.value);
            console.info("Resultado: ", existe);
        } catch (error) {
            console.error("Erro: ", error);
        }
    }

}