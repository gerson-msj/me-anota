import Crypto from "./Crypto.js";
import Api from "./Api.js";
export default class BaseService {
    crypto;
    api;
    constructor(baseUrl) {
        this.crypto = new Crypto();
        this.api = new Api(baseUrl);
    }
}
//# sourceMappingURL=BaseService.js.map