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

        this.viewModel.onConsultar = async (nomeHash: string) => await this.consultar(nomeHash);
        this.viewModel.onVoltar = () => this.dispatchEvent(new Event("voltar"));

        this.viewModel.onCriar = async (nomeHash: string, senhaHash: string, nome: string) =>
            await this.criar(nomeHash, senhaHash, nome);
    }

    async consultar(nomeHash: string): Promise<void> {
        try {
            const existe = await this.service.consultar(nomeHash);
            if (existe)
                this.viewModel.reportarExistenciaConsultar();
            else
                this.viewModel.solicitarSenha();
        } catch (error) {
            console.error("Erro Consultar: ", error);
            this.viewModel.reportarErroConsultar();
        }
    }

    async criar(nomeHash: string, senhaHash: string, nome: string) {
        try {
            const response = await this.service.criar(nomeHash, senhaHash, nome);
            if (response.ok) {
                this.dispatchEvent(new CustomEvent("avancar", { detail: { 
                    key: response.key!, 
                    token: response.token! 
                }}));
            }
            else {
                this.viewModel.reportarExistenciaCriar();
            }
        } catch (error) {
            console.error("Erro Criar: ", error);
            this.viewModel.reportarErroCriar();
        }
    }

}