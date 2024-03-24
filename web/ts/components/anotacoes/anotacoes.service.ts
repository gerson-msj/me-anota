import BaseService from "../../base.service.js";
import BlocoCrypModel from "../../models/bloco.cryp.model.js";
import BlocoModel from "../../models/bloco.model.js";
import NotaModel from "../../models/nota.model.js";
import BlocoNotasModel from "../../models/bloco.notas.model.js";

export default class AnotacoesService extends BaseService {

    private _key: CryptoKey | null = null;
    private _token: string | null = null;

    private get key() { return this._key!; }
    private get token() { return this._token!; }

    constructor() {
        super("anotacoes");
    }

    public criarChaveDev(): Promise<CryptoKey> {
        return this.crypt.obterKey("aIeH2P8UTFAsf1z_qv4sxYjYYHn53ogwTCawy5nOkcY");
    }

    public initializeData(key: CryptoKey, token: string): void {
        this._key = key;
        this._token = token;
    }

    public async obterBloco(): Promise<BlocoNotasModel | null> {

        const result = await this.handler.doGet<BlocoCrypModel>(null, this.token);
        if (result.blocoCrypt == null)
            return null;

        const blocoJSon = await this.crypt.descriptografar(this.key, result.blocoCrypt);
        const bloco = JSON.parse(blocoJSon) as BlocoModel;

        const notas: NotaModel[] = [];
        for (const notaCrypt of result.notasCrypt) {
            const notaJSon = await this.crypt.descriptografar(this.key, notaCrypt);
            const nota = JSON.parse(notaJSon) as NotaModel;
            notas.push(nota);
        }

        return { bloco, notas };
    }

}