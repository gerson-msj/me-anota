import Crypto from "./services/crypto.js";

export default abstract class BaseViewModel {

    private shadow: ShadowRoot;
    private crypto: Crypto;

    constructor(shadow: ShadowRoot) {
        this.shadow = shadow;
        this.crypto = new Crypto();
    }

    protected getElement<T>(name: string): T {
        return this.shadow.querySelector(`#${name}`) as T;
    }

    protected criarToken(nomeBloco: string, senha: string): Promise<string> {
        return this.crypto.criarToken(nomeBloco, senha);
    }

}