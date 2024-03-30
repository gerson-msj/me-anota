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
        this.viewModel.onSair = () => this.sair();
        this.dispatchEvent(new Event("initialized"));
    }
    async initializeData(ev) {
        const data = ev.detail;
        // Remover criarChaveDev e Token após desenvolvimento.
        this.key = data.key ?? await this.service.criarChaveDev();
        this.token = data.token ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhSWVIMlA4VVRGQXNmMXpfcXY0c3hZallZSG41M29nd1RDYXd5NW5Pa2NZIiwiZXhwIjoxNzQ2ODY3NDA2fQ.oDFcRHGvd3qe-QEh9dW5hmIXHM57G9Cy-RK73DnGHtE';
        //console.log("anotacoes.key: ", this.key);
        //console.log("anotacoes.token: ", this.token);
        // Remover criarChaveDev e Token após desenvolvimento.
        this.service.initializeData(this.key, this.token);
        try {
            await this.obterBloco();
        }
        catch (error) {
            console.error(error);
            //this.sair();
        }
    }
    async obterBloco() {
        const blocoNotas = await this.service.obterBloco();
        if (blocoNotas == null)
            throw new Error("Bloco não encontrado.");
        console.log("anotacoes.obterBloco: ", blocoNotas);
        this.viewModel.apresentar(blocoNotas);
    }
    sair() {
        this.dispatchEvent(new Event("sair"));
    }
}
//# sourceMappingURL=anotacoes.component.js.map