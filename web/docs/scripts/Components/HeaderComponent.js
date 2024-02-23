import BaseComponent from "./BaseComponent.js";
import HeaderService from "../Services/HeaderService.js";
import HeaderViewModel from "../ViewModels/HeaderViewModel.js";
export default class HeaderComponent extends BaseComponent {
    constructor() {
        super("header");
    }
    initialize() {
        this.initializeService(HeaderService);
        this.initializeViewModel(HeaderViewModel);
    }
}
//# sourceMappingURL=HeaderComponent.js.map