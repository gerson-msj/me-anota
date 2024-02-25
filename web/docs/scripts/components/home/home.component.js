import BaseComponent from "../../base.component.js";
import HomeService from "./home.service.js";
import HomeViewModel from "./home.viewmodel.js";
export default class HomeComponent extends BaseComponent {
    constructor() {
        super("home");
    }
    initialize() {
        this.initializeService(HomeService);
        this.initializeViewModel(HomeViewModel);
        this.viewModel.onAbrir = () => this.dispatchEvent(new Event("abrir"));
        this.viewModel.onCriar = () => this.dispatchEvent(new Event("criar"));
    }
}
//# sourceMappingURL=home.component.js.map