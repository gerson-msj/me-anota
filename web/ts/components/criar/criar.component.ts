import BaseComponent from "../../base.component.js";
import CriarService from "./criar.service.js";
import CriarViewModel from "./criar.viewmodel.js";

export default class CriarComponent extends BaseComponent<CriarService, CriarViewModel> {

    constructor() {
        super("criar");
    }

    initialize(): void {
        this.initializeService(CriarService);
        this.initializeViewModel(CriarViewModel);

        this.viewModel.onVerificar = async () => await this.verificar();
        this.viewModel.onVoltar = () => this.dispatchEvent(new Event("voltar"));
        this.viewModel.onCriar = async () => await this.criar();
    }

    async verificar(): Promise<void> {
        const token = await this.viewModel.token();
        try {    
            const existe = await this.service.existeBloco(token);
            this.viewModel.exibirSenha(!existe);
            this.viewModel.resultadoVerificacao = existe ? `A nota ${this.viewModel.nomeBloco} já existe.` : `A nota ${this.viewModel.nomeBloco} está disponível.`;
        } catch (error) {
            console.error("Erro: ", error);
            this.viewModel.exibirSenha(false);
            this.viewModel.resultadoVerificacao = "Não foi possível verificar a nota no momento.";
        }
    }

    async criar(): Promise<void> {
        const token = await this.viewModel.token();
        const ok = await this.service.criarBloco(this.viewModel.nomeBloco, token);
        if (ok) {
            this.dispatchEvent(new CustomEvent("abrirAnotacoes", { detail: token }));
        }
        else
            console.log("ok: ", ok);

    }

}