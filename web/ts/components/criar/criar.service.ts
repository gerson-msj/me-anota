import BaseService from "../../base.service.js";

export default class CriarService extends BaseService {

    constructor() {
        super("criar");        
    }

    public async existBloco(token: string): Promise<boolean> {
        const hashNomeBloco = token.split(".")[0];
        const response = await this.api.doGet<{ existe: boolean }>(new URLSearchParams({ nomeBloco: hashNomeBloco }));
        return response.existe;
    }

    public async criarBloco(nomeBloco: string, token: string): Promise<boolean> {
        const [hashNomeBloco, hashSenha] = token.split(".");
        const bloco = { nome: nomeBloco, ultimoId: 0 };
        const msgCrypt = await this.crypto.criptografar(hashSenha, bloco);
        const data = await this.api.doPost<{ ok: boolean, versionstamp: string }>({ nomeBloco: hashNomeBloco, bloco: msgCrypt });
        return data.ok;
    }

    public criarToken(nomeBloco: string, senha: string): Promise<string> {
        return this.crypto.criarToken(nomeBloco, senha);
    }

}