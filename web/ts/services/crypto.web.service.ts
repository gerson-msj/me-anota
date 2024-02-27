export default class CryptoWebService {

    private encoder: TextEncoder;

    constructor() {
        this.encoder = new TextEncoder();
    }

    public normalizar(text: string): string {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    public async obterHash(text: string): Promise<string> {
        const hashBuffer = await crypto.subtle.digest("SHA-256", this.encoder.encode(text));
        const hash = this.arrayBufferToString64(hashBuffer);
        return hash;
    }

    public async criarToken(nomeBloco: string, senha: string): Promise<string> {
        const hashNomeBloco = await this.obterHash(this.normalizar(nomeBloco));
        const hashSenha = await this.obterHash(`${nomeBloco}${senha}`);
        return `${hashNomeBloco}.${hashSenha}`;
    }

    public async criptografar<T>(senha: string, obj: T): Promise<string> {
        const keyData = this.encoder.encode(senha);
        const dataJson = JSON.stringify(obj);
        const data = this.encoder.encode(dataJson);

        const saltArray = this.createArrayBuffer(16);
        const ivArray = this.createArrayBuffer(16);

        const key = await this.getkey(keyData, saltArray);
        
        const dataCryptArray = await this.encrypt(key, data, ivArray);

        const salt = this.arrayBufferToString64(saltArray);
        const iv = this.arrayBufferToString64(ivArray);
        const dataCrypt = this.arrayBufferToString64(dataCryptArray);

        const msgCrypt = `${salt}.${iv}.${dataCrypt}`;

        return msgCrypt;
    }

    public async descriptografar<T>(senha: string, msgCrypt: string): Promise<T> {
        const keyData = this.encoder.encode(senha);
        const [salt, iv, dataCrypt] = msgCrypt.split(".");
        const saltArray = this.string64ToArrayBuffer(salt);
        const ivArray = this.string64ToArrayBuffer(iv);
        const dataArray = this.string64ToArrayBuffer(dataCrypt);

        const key = await this.getkey(keyData, saltArray);
        const dataDecryptArray = await this.decrypt(key, dataArray, ivArray);
        const dataDecrypt = Array.from(new Uint8Array(dataDecryptArray)).map(b => String.fromCharCode(b)).join("");
        const data = JSON.parse(dataDecrypt) as T;
        return data;
    }

    private arrayBufferToString64(arrayBuffer: ArrayBuffer): string {
        return btoa(Array.from(new Uint8Array(arrayBuffer)).map(b => String.fromCharCode(b)).join(""));
    }

    private string64ToArrayBuffer(string64: string): ArrayBuffer {
        return new Uint8Array(atob(string64).split("").map(c => c.charCodeAt(0)));
    }

    private createArrayBuffer(size: number): ArrayBuffer {
        const array = new Uint8Array(size);
        crypto.getRandomValues(array);
        return array;
    }

    private async getkey(keyData: BufferSource, saltArray: ArrayBuffer): Promise<CryptoKey> {
        const baseKey = await crypto.subtle.importKey(
            "raw", keyData, "PBKDF2", false, ["deriveKey"]
        );

        const keyAlgorithm: Pbkdf2Params = { name: "PBKDF2", hash: "SHA-256", salt: saltArray, iterations: 100000 };
        const derivedKeyType: AesDerivedKeyParams = { name: "AES-GCM", length: 256 };
        const key = await crypto.subtle.deriveKey(keyAlgorithm, baseKey, derivedKeyType, true, ["encrypt", "decrypt"]);
        return key;
    }

    private async encrypt(key: CryptoKey, data: BufferSource, ivArray: ArrayBuffer): Promise<ArrayBuffer> {
        const encryptAlgorithm: AesGcmParams = { name: "AES-GCM", iv: ivArray };
        const dataCryptBuffer = await crypto.subtle.encrypt(encryptAlgorithm, key, data);
        const dataCryptArray = new Uint8Array(dataCryptBuffer);
        return dataCryptArray;
    }

    private async decrypt(key: CryptoKey, data: BufferSource, ivArray: ArrayBuffer): Promise<ArrayBuffer> {
        const decryptAlgorithm: AesGcmParams = { name: "AES-GCM", iv: ivArray };
        const dataDecryptBuffer = await crypto.subtle.decrypt(decryptAlgorithm, key, data);
        const dataDecryptArray = new Uint8Array(dataDecryptBuffer);
        return dataDecryptArray;
    }

}