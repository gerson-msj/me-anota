import BaseViewModel from "./BaseViewModel.js";
export default class HomeViewModel extends BaseViewModel {
    abrir;
    criar;
    onAbrir = () => { };
    onCriar = () => { };
    constructor(shadow) {
        super(shadow);
        this.abrir = this.getElement("abrir");
        this.criar = this.getElement("criar");
        this.abrir.addEventListener("click", (ev) => {
            ev.preventDefault();
            this.onAbrir();
        });
        this.criar.addEventListener("click", (ev) => {
            ev.preventDefault();
            this.onCriar();
        });
    }
}
//# sourceMappingURL=HomeViewModel.js.map