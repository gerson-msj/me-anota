import AnotacoesService from "./anotacoes.service.js";
import AnotacoesViewModel from "./anotacoes.viewmodel.js";
import BaseComponent from "../../base.component.js";
export default class AnotacoesComponent extends BaseComponent {
    key = null;
    token = null;
    constructor() {
        super("anotacoes");
        this.addEventListener("initializeData", async (ev) => {
            await this.initializeData(ev);
        });
    }
    initialize() {
        console.log("Initialize");
        this.initializeService(AnotacoesService);
        this.initializeViewModel(AnotacoesViewModel);
        this.viewModel.onSair = () => this.dispatchEvent(new Event("sair"));
        this.dispatchEvent(new Event("initialized"));
    }
    async initializeData(ev) {
        const data = ev.detail;
        this.service.initializeData(data.key, data.token);
        // Remover criarChaveDev e Token após desenvolvimento.
        this.key = data.key ?? await this.service.criarChaveDev();
        this.token = data.token ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhSWVIMlA4VVRGQXNmMXpfcXY0c3hZallZSG41M29nd1RDYXd5NW5Pa2NZIiwiZXhwIjoxNzQ2ODY3NDA2fQ.oDFcRHGvd3qe-QEh9dW5hmIXHM57G9Cy-RK73DnGHtE';
        console.log("anotacoes.key: ", this.key);
        console.log("anotacoes.token: ", this.token);
        // Remover criarChaveDev e Token após desenvolvimento.
    }
}
//# sourceMappingURL=anotacoes.component.js.map