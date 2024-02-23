import BaseComponent from "./BaseComponent.js";
import AbrirService from "../Services/AbrirService.js";
import AbrirViewModel from "../ViewModels/AbrirViewModel.js";

export default class AbrirComponent extends BaseComponent<AbrirService, AbrirViewModel> {
    
    constructor() {
        super("abrir");
    }
    
    
    initialize(): void {
        this.initializeService(AbrirService);
        this.initializeViewModel(AbrirViewModel);
    }

}