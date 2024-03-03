import AnotacoesService from "./anotacoes.service.js";
import AnotacoesViewModel from "./anotacoes.viewmodel.js";
import BaseComponent from "../../base.component.js";

export default class AnotacoesComponent extends BaseComponent<AnotacoesService, AnotacoesViewModel> {

    private key: CryptoKey | null = null;
    private token: string | null = null;


    constructor() {
        super("anotacoes");

        this.addEventListener("initializeData", (ev) => {
            this.initializeData(ev as CustomEvent);
        });
    }

    initialize(): void {
        this.initializeService(AnotacoesService);
        this.initializeViewModel(AnotacoesViewModel);

        this.viewModel.onSair = () => this.dispatchEvent(new Event("sair"));
    }

    private initializeData(ev: CustomEvent) {
        const data: { key: CryptoKey, token: string } = ev.detail;
        this.key = data.key;
        this.token = data.token;
        console.log("anotacoes.key: ", this.key);
        console.log("anotacoes.token: ", this.token);
    }
}