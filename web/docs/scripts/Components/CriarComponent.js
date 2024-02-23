import BaseComponent from "./BaseComponent.js";
import CriarService from "../Services/CriarService.js";
import CriarViewModel from "../ViewModels/CriarViewModel.js";
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
        try {
            const existe = await this.service.ExistBloco(this.viewModel.nome);
            this.viewModel.exibirSenha(!existe);
            this.viewModel.resultadoVerificacao = existe ? `A nota ${this.viewModel.nome} já existe.` : `A nota ${this.viewModel.nome} está disponível.`;
        }
        catch (error) {
            console.error("Erro: ", error);
            this.viewModel.exibirSenha(false);
            this.viewModel.resultadoVerificacao = "Não foi possível verificar a nota no momento.";
        }
    }
    async criar() {
        const ok = await this.service.CriarBloco(this.viewModel.nome, this.viewModel.senha);
        if (ok)
            this.dispatchEvent(new CustomEvent("abrirAnotacoes", { detail: { nome: this.viewModel.nome, senha: this.viewModel.senha } }));
        else
            console.log("ok: ", ok);
    }
}
//# sourceMappingURL=CriarComponent.js.map