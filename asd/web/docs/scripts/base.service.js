import CryptoService from "./services/crypto.js";
import ApiService from "./services/api.js";
export default class BaseService {
    crypto;
    api;
    constructor(baseUrl) {
        this.crypto = new CryptoService();
        this.api = new ApiService(baseUrl);
    }
}
//# sourceMappingURL=base.service.js.map