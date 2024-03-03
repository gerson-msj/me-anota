import BaseService from "../../base.service.js";

export default class AbrirService extends BaseService {

    constructor() {
        super("abrir");
    }

    public async abrir(nomeHash: string, senhaHash: string): Promise<{ ok: boolean, key: CryptoKey | null, token: string | null }> {
        const response = await this.handler.doGet<{ ok: boolean, token: string | null }>(new URLSearchParams({ nomeHash: nomeHash, senhaHash: senhaHash }));
        return {
            ok: response.ok,
            key: response.ok ? await this.crypt.obterKey(senhaHash) : null,
            token: response.token
        };
    }

}