import BaseService from "../../base.service.js";
export default class CriarService extends BaseService {
    constructor() {
        super("criar");
    }
    async existBloco(token) {
        const hashNomeBloco = token.split(".")[0];
        const response = await this.api.doGet(new URLSearchParams({ nomeBloco: hashNomeBloco }));
        return response.existe;
    }
    async criarBloco(nomeBloco, token) {
        const [hashNomeBloco, hashSenha] = token.split(".");
        const bloco = { nome: nomeBloco, ultimoId: 0 };
        const msgCrypt = await this.crypto.criptografar(hashSenha, bloco);
        const data = await this.api.doPost({ nomeBloco: hashNomeBloco, bloco: msgCrypt });
        return data.ok;
    }
    criarToken(nomeBloco, senha) {
        return this.crypto.criarToken(nomeBloco, senha);
    }
}
//# sourceMappingURL=criar.service.js.map