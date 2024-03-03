import BaseService from "../../base.service.js";
export default class AbrirService extends BaseService {
    constructor() {
        super("abrir");
    }
    async validarAcesso(nomeBloco, token) {
        const [hashNomeBloco, hashSenha] = token.split(".");
        const bloco = await this.handler.doGet(new URLSearchParams({ nomeBloco: hashNomeBloco }));
        if (bloco.nome === null)
            return false;
        try {
            const nomeBlocoDecrypt = ""; //await this.crypt.descriptografar("hashSenha", bloco.nome);
            return nomeBlocoDecrypt == nomeBloco;
        }
        catch (error) {
            return false;
        }
    }
}
//# sourceMappingURL=abrir.service.js.map