import BaseService from "../../base.service.js";
import BlocoCrypModel from "../../models/bloco.cryp.model.js";

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

    public async obterAnotacoes(): Promise<BlocoCrypModel | null> {
        
        try {
            


            const result = await this.handler.doGet<BlocoCrypModel>(null, this.token);
            return result;
        } catch (error) {
            console.log("obterAnotacoes: ", error);
            return null;
        }
        
        
    }

}