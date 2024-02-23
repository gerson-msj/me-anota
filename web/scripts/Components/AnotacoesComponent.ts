import AnotacoesService from "../Services/AnotacoesService.js";
import AnotacoesViewModel from "../ViewModels/AnotacoesViewModel.js";
import BaseComponent from "./BaseComponent.js";
import IUser from "../Interfaces/IUser.js";

export default class AnotacoesComponent extends BaseComponent<AnotacoesService, AnotacoesViewModel> {

    private _user: IUser | null = null;
    private get user() { return this._user!; }

    constructor() {
        super("anotacoes");

        this.addEventListener("initializeUser", (ev) => {
            this.initializeUser((ev as CustomEvent).detail as IUser);
        });
    }

    initialize(): void {
        this.initializeService(AnotacoesService);
        this.initializeViewModel(AnotacoesViewModel);
    }

    public initializeUser(user: IUser) {
        this._user = user;
        console.log("anotacoes.user: ", this.user);
    }
}