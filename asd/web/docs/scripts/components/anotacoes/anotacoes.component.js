import AnotacoesService from "./anotacoes.service.js";
import AnotacoesViewModel from "./anotacoes.viewmodel.js";
import BaseComponent from "../../base.component.js";
export default class AnotacoesComponent extends BaseComponent {
    token = null;
    constructor() {
        super("anotacoes");
        this.addEventListener("initializeToken", (ev) => {
            this.initializeToken(ev.detail);
        });
    }
    initialize() {
        this.initializeService(AnotacoesService);
        this.initializeViewModel(AnotacoesViewModel);
        this.viewModel.onSair = () => this.dispatchEvent(new Event("sair"));
    }
    initializeToken(token) {
        this.token = token;
        console.log("anotacoes.token: ", this.token);
    }
}
//# sourceMappingURL=anotacoes.component.js.map