import BaseComponent from "../../base.component.js";
import HeaderService from "./header.service.js";
import HeaderViewModel from "./header.viewmodel.js";
export default class HeaderComponent extends BaseComponent {
    constructor() {
        super("header");
    }
    initialize() {
        this.initializeService(HeaderService);
        this.initializeViewModel(HeaderViewModel);
    }
}
//# sourceMappingURL=header.component.js.map