import AnotacoesService from "./anotacoes.service.js";
import AnotacoesViewModel from "./anotacoes.viewmodel.js";
import BaseComponent from "../../base.component.js";

export default class AnotacoesComponent extends BaseComponent<AnotacoesService, AnotacoesViewModel> {

    private token: string | null = null;
    
    constructor() {
        super("anotacoes");

        this.addEventListener("initializeToken", (ev) => {
            this.initializeToken((ev as CustomEvent).detail as string);
        });
    }

    initialize(): void {
        this.initializeService(AnotacoesService);
        this.initializeViewModel(AnotacoesViewModel);

        this.viewModel.onSair = () => this.dispatchEvent(new Event("sair"));
    }

    private initializeToken(token: string) {
        this.token = token;
        console.log("anotacoes.token: ", this.token);
    }
}