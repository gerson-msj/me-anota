import AnotacoesService from "./anotacoes.service.js";
import AnotacoesViewModel from "./anotacoes.viewmodel.js";
import BaseComponent from "../../base.component.js";
export default class AnotacoesComponent extends BaseComponent {
    key = null;
    token = null;
    constructor() {
        super("anotacoes");
        this.addEventListener("initializeData", (ev) => {
            this.initializeData(ev);
        });
    }
    initialize() {
        this.initializeService(AnotacoesService);
        this.initializeViewModel(AnotacoesViewModel);
        this.viewModel.onSair = () => this.dispatchEvent(new Event("sair"));
    }
    initializeData(ev) {
        const data = ev.detail;
        this.key = data.key;
        this.token = data.token;
        console.log("anotacoes.key: ", this.key);
        console.log("anotacoes.token: ", this.token);
    }
}
//# sourceMappingURL=anotacoes.component.js.map