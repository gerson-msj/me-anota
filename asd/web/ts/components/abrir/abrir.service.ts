import BaseService from "../../base.service.js";

export default class AbrirService extends BaseService {

    constructor() {
        super("abrir");
    }

    async validarAcesso(nomeBloco: string, token: string): Promise<boolean> {
        const [hashNomeBloco, hashSenha] = token.split(".");
        
        const data = await this.api.doGet<{ bloco: string | null }>(new URLSearchParams({ nomeBloco: hashNomeBloco }));

        if(data.bloco == null)
            return false;

        try {
            const bloco = await this.crypto.descriptografar<{nome: string, ultimoId: number}>(hashSenha, data.bloco);
            return bloco.nome == nomeBloco;
        } catch (error) {
            return false;
        }
    }

}