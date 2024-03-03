import BaseComponent from "../../base.component.js";
import AbrirService from "./abrir.service.js";
import AbrirViewModel from "./abrir.viewmodel.js";
export default class AbrirComponent extends BaseComponent {
    constructor() {
        super("abrir");
    }
    initialize() {
        this.initializeService(AbrirService);
        this.initializeViewModel(AbrirViewModel);
        this.viewModel.onVoltar = () => this.dispatchEvent(new Event("voltar"));
        this.viewModel.onAbrir = () => this.abrir();
    }
    async abrir() {
        const token = ""; //await this.viewModel.token();
        const valido = await this.service.validarAcesso(this.viewModel.nomeBloco, token);
        this.viewModel.resultado = valido ? "Tudo certo!" : "Deu ruim!";
    }
}
//# sourceMappingURL=abrir.component.js.map