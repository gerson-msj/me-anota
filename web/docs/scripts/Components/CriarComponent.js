import BaseComponent from "./BaseComponent.js";
import CriarService from "../Services/CriarService.js";
export default class CriarComponent extends BaseComponent {
    service;
    _nome = null;
    get nome() { return this._nome; }
    _verificar = null;
    get verificar() { return this._verificar; }
    _voltar = null;
    get voltar() { return this._voltar; }
    constructor() {
        super("criar");
        this.service = new CriarService();
    }
    initialize() {
        this._nome = this.getElement("nome");
        this._verificar = this.getElement("verificar");
        this._voltar = this.getElement("voltar");
        this.nome.addEventListener("keyup", () => this.verificar.disabled = this.nome.value == "");
        this.verificar.addEventListener("click", async () => await this.onVerificar());
        this.voltar.addEventListener("click", (ev) => {
            this.dispatchEvent(new Event("voltar"));
            ev.preventDefault();
        });
    }
    async onVerificar() {
        try {
            const existe = await this.service.ExisteNota(this.nome.value);
            console.info("Resultado: ", existe);
        }
        catch (error) {
            console.error("Erro: ", error);
        }
    }
}
//# sourceMappingURL=CriarComponent.js.map