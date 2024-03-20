import BaseService from "../../base.service.js";
export default class CriarService extends BaseService {
    constructor() {
        super("criar");
    }
    async consultar(nomeHash) {
        const response = await this.handler.doGet(new URLSearchParams({ nomeHash: nomeHash }));
        return response.existe;
    }
    async criar(nomeHash, senhaHash, blocoCrypt) {
        ;
        const data = {
            nomeHash: nomeHash,
            senhaHash: senhaHash,
            blocoCrypt: blocoCrypt
        };
        const response = await this.handler.doPost(data);
        return {
            ok: response.ok,
            key: response.ok ? await this.crypt.obterKey(senhaHash) : null,
            token: response.token
        };
    }
}
//# sourceMappingURL=criar.service.js.map