import BaseComponent from "../../base.component.js";
import HeaderService from "./header.service.js";
import HeaderViewModel from "./header.viewmodel.js";

export default class HeaderComponent extends BaseComponent<HeaderService, HeaderViewModel> {
    
    constructor() {
        super("header");
    }

    initialize(): void {
        this.initializeService(HeaderService);
        this.initializeViewModel(HeaderViewModel);
    }
}