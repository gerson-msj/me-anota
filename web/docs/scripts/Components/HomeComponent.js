import BaseComponent from "./BaseComponent.js";
import HomeService from "../Services/HomeService.js";
import HomeViewModel from "../ViewModels/HomeViewModel.js";
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
//# sourceMappingURL=HomeComponent.js.map