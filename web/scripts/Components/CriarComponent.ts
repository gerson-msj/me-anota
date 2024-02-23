import BaseComponent from "./BaseComponent.js";
import CriarService from "../Services/CriarService.js";
import CriarViewModel from "../ViewModels/CriarViewModel.js";

export default class CriarComponent extends BaseComponent {

    private _service: CriarService | null = null;
    private get service() { return this._service! }
    private _viewModel: CriarViewModel | null = null;
    private get viewModel() { return this._viewModel!; }

    constructor() {
        super("criar");
    }

    initialize(): void {
        this._service = new CriarService();
        this._viewModel = new CriarViewModel(this.shadow);

        this.viewModel.onVerificar = async () => await this.verificar();
        this.viewModel.onVoltar = () => this.dispatchEvent(new Event("voltar"));
        this.viewModel.onCriar = async () => await this.criar();
    }

    async verificar(): Promise<void> {
        try {
            const existe = await this.service.ExistBloco(this.viewModel.nome);
            this.viewModel.exibirSenha(!existe);
            this.viewModel.resultadoVerificacao = existe ? `A nota ${this.viewModel.nome} já existe.` : `A nota ${this.viewModel.nome} está disponível.`;
        } catch (error) {
            console.error("Erro: ", error);
            this.viewModel.exibirSenha(false);
            this.viewModel.resultadoVerificacao = "Não foi possível verificar a nota no momento.";
        }
    }

    async criar(): Promise<void> {
        const ok = await this.service.CriarBloco(this.viewModel.nome, this.viewModel.senha);
        console.log("ok: ", ok);
    }

}