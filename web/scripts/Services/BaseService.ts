import Crypto from "./Crypto.js";
import Api from "./Api.js";

export default abstract class BaseService {
    
    protected crypto: Crypto;
    protected api: Api;

    constructor(baseUrl: string) {
        this.crypto = new Crypto();
        this.api = new Api(baseUrl);
    }
}