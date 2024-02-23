import AnotacoesService from "../Services/AnotacoesService.js";
import AnotacoesViewModel from "../ViewModels/AnotacoesViewModel.js";
import BaseComponent from "./BaseComponent.js";
export default class AnotacoesComponent extends BaseComponent {
    _user = null;
    get user() { return this._user; }
    constructor() {
        super("anotacoes");
        this.addEventListener("initializeUser", (ev) => {
            this.initializeUser(ev.detail);
        });
    }
    initialize() {
        this.initializeService(AnotacoesService);
        this.initializeViewModel(AnotacoesViewModel);
    }
    initializeUser(user) {
        this._user = user;
        console.log("anotacoes.user: ", this.user);
    }
}
//# sourceMappingURL=AnotacoesComponent.js.map