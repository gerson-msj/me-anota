import BaseComponent from "../../base.component.js";
import CriarService from "./criar.service.js";
import CriarViewModel from "./criar.viewmodel.js";
export default class CriarComponent extends BaseComponent {
    constructor() {
        super("criar");
    }
    initialize() {
        this.initializeService(CriarService);
        this.initializeViewModel(CriarViewModel);
        this.viewModel.onVerificar = async () => await this.verificar();
        this.viewModel.onVoltar = () => this.dispatchEvent(new Event("voltar"));
        this.viewModel.onCriar = async () => await this.criar();
    }
    async verificar() {
        const token = await this.viewModel.token();
        try {
            const existe = await this.service.existBloco(token);
            this.viewModel.exibirSenha(!existe);
            this.viewModel.resultadoVerificacao = existe ? `A nota ${this.viewModel.nomeBloco} já existe.` : `A nota ${this.viewModel.nomeBloco} está disponível.`;
        }
        catch (error) {
            console.error("Erro: ", error);
            this.viewModel.exibirSenha(false);
            this.viewModel.resultadoVerificacao = "Não foi possível verificar a nota no momento.";
        }
    }
    async criar() {
        const token = await this.viewModel.token();
        const ok = await this.service.criarBloco(this.viewModel.nomeBloco, token);
        if (ok) {
            this.dispatchEvent(new CustomEvent("abrirAnotacoes", { detail: token }));
        }
        else
            console.log("ok: ", ok);
    }
}
//# sourceMappingURL=criar.component.js.map