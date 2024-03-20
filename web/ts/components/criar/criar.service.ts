import BaseService from "../../base.service.js";

export default class CriarService extends BaseService {

    constructor() {
        super("criar");
    }

    public async consultar(nomeHash: string): Promise<boolean> {
        const response = await this.handler.doGet<{ existe: boolean }>(new URLSearchParams({ nomeHash: nomeHash }));
        return response.existe;
    }

    public async criar(nomeHash: string, senhaHash: string, blocoCrypt: string): Promise<{ ok: boolean, key: CryptoKey | null, token: string | null }> {
        
        interface responseType {
            ok: boolean;
            token: string | null;
        };

        const data = {
            nomeHash: nomeHash, 
            senhaHash: senhaHash, 
            blocoCrypt: blocoCrypt
        }

        const response = await this.handler.doPost<responseType>(data);
        
        return {
            ok: response.ok,
            key: response.ok ? await this.crypt.obterKey(senhaHash) : null,
            token: response.token
        };
    }

}