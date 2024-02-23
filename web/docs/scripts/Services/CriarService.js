import CryptoService from "./CryptoService.js";
import ApiService from "./ApiService.js";
export default class CriarService {
    crypto;
    api;
    constructor() {
        this.crypto = new CryptoService();
        this.api = new ApiService("criar");
    }
    async ExistBloco(nome) {
        const hash = await this.crypto.ObterHash(nome);
        const response = await this.api.doGet(new URLSearchParams({ hash: hash }));
        return response.existe;
    }
    async CriarBloco(nome, senha) {
        const hash = await this.crypto.ObterHash(nome);
        const nota = { nome: nome, ultimoId: 0 };
        const msgCrypto = await this.crypto.Criptografar(senha, nota);
        console.log("hash: ", hash);
        console.log("msgCrypto: ", msgCrypto);
        const data = await this.api.doPost({ hash: hash, nota: msgCrypto });
        return data.ok;
    }
}
//# sourceMappingURL=CriarService.js.map