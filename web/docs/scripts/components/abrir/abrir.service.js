import BaseService from "../../base.service.js";
export default class AbrirService extends BaseService {
    constructor() {
        super("abrir");
    }
    async abrir(nomeHash, senhaHash) {
        const response = await this.handler.doGet(new URLSearchParams({ nomeHash: nomeHash, senhaHash: senhaHash }));
        return {
            ok: response.ok,
            key: response.ok ? await this.crypt.obterKey(senhaHash) : null,
            token: response.token
        };
    }
}
//# sourceMappingURL=abrir.service.js.map