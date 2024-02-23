import BaseComponent from "./BaseComponent.js";
import HomeService from "../Services/HomeService.js";
import HomeViewModel from "../ViewModels/HomeViewModel.js";

export default class HomeComponent extends BaseComponent<HomeService, HomeViewModel> {

    constructor() {
        super("home");
        
    }    
    
    initialize(): void {
        this.initializeService(HomeService);
        this.initializeViewModel(HomeViewModel);

        this.viewModel.onAbrir = () => this.dispatchEvent(new Event("abrir"));
        this.viewModel.onCriar = () => this.dispatchEvent(new Event("criar"));
    }
}