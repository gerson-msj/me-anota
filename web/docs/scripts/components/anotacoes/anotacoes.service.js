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
    async obterAnotacoes() {
        try {
            const result = await this.handler.doGet(null, this.token);
            return result;
        }
        catch (error) {
            console.log("obterAnotacoes: ", error);
            return null;
        }
    }
}
//# sourceMappingURL=anotacoes.service.js.map