export default class BaseViewModel {
    shadow;
    constructor(shadow) {
        this.shadow = shadow;
    }
    getElement(name) {
        return this.shadow.querySelector(`#${name}`);
    }
}
//# sourceMappingURL=BaseViewModel.js.map