import BaseComponent from "../../base.component.js";
import AbrirService from "./abrir.service.js";
import AbrirViewModel from "./abrir.viewmodel.js";

export default class AbrirComponent extends BaseComponent<AbrirService, AbrirViewModel> {

    constructor() {
        super("abrir");
    }


    initialize(): void {
        this.initializeService(AbrirService);
        this.initializeViewModel(AbrirViewModel);

        this.viewModel.onVoltar = () => this.dispatchEvent(new Event("voltar"));
        this.viewModel.onAbrir = () => this.abrir();
    }

    async abrir(): Promise<void> {
        const token = "";//await this.viewModel.token();
        const valido = await this.service.validarAcesso(this.viewModel.nomeBloco, token);
        this.viewModel.resultado = valido ? "Tudo certo!" : "Deu ruim!";
        
    }

}