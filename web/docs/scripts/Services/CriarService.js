import CryptoService from "./CryptoService.js";
import ApiService from "./ApiService.js";
export default class CriarService {
    crypto;
    api;
    constructor() {
        this.crypto = new CryptoService();
        this.api = new ApiService("criar");
    }
    async ExisteNota(nota) {
        const hash = await this.crypto.ObterHash(nota);
        const response = await this.api.doGet(new URLSearchParams({ nota: hash }));
        return response.existe;
    }
}
//# sourceMappingURL=CriarService.js.map