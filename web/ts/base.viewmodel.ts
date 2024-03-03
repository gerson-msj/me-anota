import Crypto from "./services/client.crypt.js";

export default abstract class BaseViewModel {

    private shadow: ShadowRoot;
    protected crypto: Crypto;

    constructor(shadow: ShadowRoot) {
        this.shadow = shadow;
        this.crypto = new Crypto();
    }

    protected getElement<T>(name: string): T {
        return this.shadow.querySelector(`#${name}`) as T;
    }
}