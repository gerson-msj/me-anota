import CryptoWebService from "./services/crypto.web.service.js";
import ApiService from "./services/api.js";
export default class BaseService {
    crypto;
    api;
    constructor(baseUrl) {
        this.crypto = new CryptoWebService();
        this.api = new ApiService(baseUrl);
    }
}
//# sourceMappingURL=base.service.js.map