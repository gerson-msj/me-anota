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
        this.viewModel.onAbrir = async (nomeHash, senhaHash) => await this.abrir(nomeHash, senhaHash);
    }
    async abrir(nomeHash, senhaHash) {
        try {
            const result = await this.service.abrir(nomeHash, senhaHash);
            if (result.ok)
                this.dispatchEvent(new CustomEvent("avancar", { detail: { key: result.key, token: result.token } }));
            else
                this.viewModel.reportarInexistente();
        }
        catch (error) {
            console.error(error);
            this.viewModel.reportarErro();
        }
    }
}
//# sourceMappingURL=abrir.component.js.map