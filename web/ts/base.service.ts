import CryptoWebService from "./services/crypto.web.service.js";
import ApiService from "./services/api.js";

export default abstract class BaseService {
    
    protected crypto: CryptoWebService;
    protected api: ApiService;

    constructor(baseUrl: string) {
        this.crypto = new CryptoWebService();
        this.api = new ApiService(baseUrl);
    }
}