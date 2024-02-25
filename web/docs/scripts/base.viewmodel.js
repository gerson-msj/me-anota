import Crypto from "./services/crypto.js";
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
    criarToken(nomeBloco, senha) {
        return this.crypto.criarToken(nomeBloco, senha);
    }
}
//# sourceMappingURL=base.viewmodel.js.map