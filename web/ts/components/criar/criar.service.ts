import BaseService from "../../base.service.js";

export default class CriarService extends BaseService {

    constructor() {
        super("criar");
    }

    public async consultar(nomeHash: string): Promise<boolean> {
        const response = await this.handler.doGet<{ existe: boolean }>(new URLSearchParams({ nomeHash: nomeHash }));
        return response.existe;
    }

    public async criar(nomeHash: string, senhaHash: string, nome: string): Promise<{ ok: boolean, key: CryptoKey | null, token: string | null }> {
        const key = await this.crypt.obterKey(senhaHash);
        const nomeCryp = await this.crypt.criptografar(key, nome);
        const bloco = { 
            nomeHash: nomeHash, 
            senhaHash: senhaHash, 
            nomeCryp: nomeCryp 
        };
        
        const response = await this.handler.doPost<{ ok: boolean, token: string | null }>(bloco);
        
        return {
            ok: response.ok,
            key: response.ok ? key : null,
            token: response.token
        };
    }

}