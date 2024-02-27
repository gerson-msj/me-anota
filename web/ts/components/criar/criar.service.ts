import BaseService from "../../base.service.js";

export default class CriarService extends BaseService {

    constructor() {
        super("criar");
    }

    public async existeBloco(token: string): Promise<boolean> {
        const hashNomeBloco = token.split(".")[0];
        const response = await this.api.doGet<{ existe: boolean }>(new URLSearchParams({ nomeBloco: hashNomeBloco }));
        return response.existe;
    }

    public async criarBloco(nomeBloco: string, token: string): Promise<boolean> {
        const hashSenha = token.split(".")[1];
        const cryptNomeBloco = await this.crypto.criptografar(hashSenha, nomeBloco);
        const bloco = { token: token, nome: cryptNomeBloco };
        const request = await this.api.doPost<{ ok: boolean, versionstamp: string }>(bloco);
        return request.ok;

    }

    public criarToken(nomeBloco: string, senha: string): Promise<string> {
        return this.crypto.criarToken(nomeBloco, senha);
    }

}