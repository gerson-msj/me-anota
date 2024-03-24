import BaseService from "../../base.service.js";
export default class AnotacoesService extends BaseService {
    _key = null;
    _token = null;
    get key() { return this._key; }
    get token() { return this._token; }
    constructor() {
        super("anotacoes");
    }
    criarChaveDev() {
        return this.crypt.obterKey("aIeH2P8UTFAsf1z_qv4sxYjYYHn53ogwTCawy5nOkcY");
    }
    initializeData(key, token) {
        this._key = key;
        this._token = token;
    }
    async obterBloco() {
        const result = await this.handler.doGet(null, this.token);
        if (result.blocoCrypt == null)
            return null;
        const blocoJSon = await this.crypt.descriptografar(this.key, result.blocoCrypt);
        const bloco = JSON.parse(blocoJSon);
        const notas = [];
        for (const notaCrypt of result.notasCrypt) {
            const notaJSon = await this.crypt.descriptografar(this.key, notaCrypt);
            const nota = JSON.parse(notaJSon);
            notas.push(nota);
        }
        return { bloco, notas };
    }
}
//# sourceMappingURL=anotacoes.service.js.map