import CryptoService from "./services/crypto.js";
import ApiService from "./services/api.js";

export default abstract class BaseService {
    
    protected crypto: CryptoService;
    protected api: ApiService;

    constructor(baseUrl: string) {
        this.crypto = new CryptoService();
        this.api = new ApiService(baseUrl);
    }
}