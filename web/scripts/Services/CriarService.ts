import CryptoService from "./CryptoService.js";
import ApiService from "./ApiService.js";

export default class CriarService {

    private crypto: CryptoService;
    private api: ApiService;

    constructor() {
        this.crypto = new CryptoService();
        this.api = new ApiService("criar");
    }

    public async ExisteNota(nota: string): Promise<boolean> {
        const hash = await this.crypto.ObterHash(nota);
        const response = await this.api.doGet<{ existe: boolean }>(new URLSearchParams({ nota: hash }));
        return response.existe;
    }

}