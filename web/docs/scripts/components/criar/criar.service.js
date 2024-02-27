import BaseService from "../../base.service.js";
export default class CriarService extends BaseService {
    constructor() {
        super("criar");
    }
    async existeBloco(token) {
        const hashNomeBloco = token.split(".")[0];
        const response = await this.api.doGet(new URLSearchParams({ nomeBloco: hashNomeBloco }));
        return response.existe;
    }
    async criarBloco(nomeBloco, token) {
        const hashSenha = token.split(".")[1];
        const cryptNomeBloco = await this.crypto.criptografar(hashSenha, nomeBloco);
        const bloco = { token: token, nome: cryptNomeBloco };
        const request = await this.api.doPost(bloco);
        return request.ok;
    }
    criarToken(nomeBloco, senha) {
        return this.crypto.criarToken(nomeBloco, senha);
    }
}
//# sourceMappingURL=criar.service.js.map