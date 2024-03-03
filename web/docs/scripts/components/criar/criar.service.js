import BaseService from "../../base.service.js";
export default class CriarService extends BaseService {
    constructor() {
        super("criar");
    }
    async consultar(nomeHash) {
        const response = await this.handler.doGet(new URLSearchParams({ nomeHash: nomeHash }));
        return response.existe;
    }
    async criar(nomeHash, senhaHash, nome) {
        const key = await this.crypt.obterKey(senhaHash);
        const nomeCryp = await this.crypt.criptografar(key, nome);
        const bloco = {
            nomeHash: nomeHash,
            senhaHash: senhaHash,
            nomeCryp: nomeCryp
        };
        const response = await this.handler.doPost(bloco);
        return {
            ok: response.ok,
            key: response.ok ? key : null,
            token: response.token
        };
    }
}
//# sourceMappingURL=criar.service.js.map