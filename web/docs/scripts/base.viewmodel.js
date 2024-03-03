import Crypto from "./services/client.crypt.js";
export default class BaseViewModel {
    shadow;
    crypto;
    constructor(shadow) {
        this.shadow = shadow;
        this.crypto = new Crypto();
    }
    getElement(name) {
        return this.shadow.querySelector(`#${name}`);
    }
}
//# sourceMappingURL=base.viewmodel.js.map