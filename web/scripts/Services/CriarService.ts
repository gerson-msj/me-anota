import BaseService from "./BaseService.js";

export default class CriarService extends BaseService {

    constructor() {
        super("criar");        
    }

    public async ExistBloco(nome: string): Promise<boolean> {
        const hash = await this.crypto.ObterHash(nome);
        const response = await this.api.doGet<{ existe: boolean }>(new URLSearchParams({ hash: hash }));
        return response.existe;
    }

    public async CriarBloco(nome: string, senha: string): Promise<boolean> {
        const hash = await this.crypto.ObterHash(nome);
        const nota = { nome: nome, ultimoId: 0 };
        const msgCrypto = await this.crypto.Criptografar(senha, nota);
        const data = await this.api.doPost<{ ok: boolean, versionstamp: string }>({ hash: hash, nota: msgCrypto });
        return data.ok;
    }

}