import BaseService from "../../base.service.js";
export default class AbrirService extends BaseService {
    constructor() {
        super("abrir");
    }
    async validarAcesso(nomeBloco, token) {
        const [hashNomeBloco, hashSenha] = token.split(".");
        const data = await this.api.doGet(new URLSearchParams({ nomeBloco: hashNomeBloco }));
        if (data.bloco == null)
            return false;
        try {
            const bloco = await this.crypto.descriptografar(hashSenha, data.bloco);
            return bloco.nome == nomeBloco;
        }
        catch (error) {
            return false;
        }
    }
}
//# sourceMappingURL=abrir.service.js.map