import BaseComponent from "./BaseComponent.js";
import AbrirService from "../Services/AbrirService.js";
import AbrirViewModel from "../ViewModels/AbrirViewModel.js";
export default class AbrirComponent extends BaseComponent {
    constructor() {
        super("abrir");
    }
    initialize() {
        this.initializeService(AbrirService);
        this.initializeViewModel(AbrirViewModel);
    }
}
//# sourceMappingURL=AbrirComponent.js.map