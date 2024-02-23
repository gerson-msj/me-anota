import BaseComponent from "./BaseComponent.js";
import HeaderService from "../Services/HeaderService.js";
import HeaderViewModel from "../ViewModels/HeaderViewModel.js";

export default class HeaderComponent extends BaseComponent<HeaderService, HeaderViewModel> {
    
    constructor() {
        super("header");
    }

    initialize(): void {
        this.initializeService(HeaderService);
        this.initializeViewModel(HeaderViewModel);
    }
}