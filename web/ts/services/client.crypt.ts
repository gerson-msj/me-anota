export default class ClientCrypt {

    private encoder: TextEncoder;

    constructor() {
        this.encoder = new TextEncoder();
    }

    public async obterHash(text: string): Promise<string> {
        const hashBuffer = await crypto.subtle.digest("SHA-256", this.encoder.encode(text));
        const hash = this.arrayBufferToString64(hashBuffer);
        return hash;
    }

    public obterHashNormalizado(text: string): Promise<string> {
        return this.obterHash(this.normalizar(text));
    }

    public obterKey(senhaHash: string): Promise<CryptoKey> {
        const keyData = this.encoder.encode(senhaHash);
        return crypto.subtle.importKey(
            "raw", keyData, "PBKDF2", false, ["deriveKey"]
        );
    }

    public async criptografar(key: CryptoKey, msg: string): Promise<string> {
        const data = this.encoder.encode(msg);

        const saltArray = this.createArrayBuffer(16);
        const ivArray = this.createArrayBuffer(16);

        const derivedKey = await this.getDerivedKey(key, saltArray);
        
        const dataCryptArray = await this.encrypt(derivedKey, data, ivArray);

        const salt = this.arrayBufferToString64(saltArray);
        const iv = this.arrayBufferToString64(ivArray);
        const dataCrypt = this.arrayBufferToString64(dataCryptArray);

        const msgCrypt = `${salt}.${iv}.${dataCrypt}`;

        return msgCrypt;
    }

    public async descriptografar(key: CryptoKey, msgCrypt: string): Promise<string> {
        const [salt, iv, dataCrypt] = msgCrypt.split(".");
        const saltArray = this.string64ToArrayBuffer(salt);
        const ivArray = this.string64ToArrayBuffer(iv);
        const dataArray = this.string64ToArrayBuffer(dataCrypt);

        const derivedKey = await this.getDerivedKey(key, saltArray);
        const dataDecryptArray = await this.decrypt(derivedKey, dataArray, ivArray);
        const dataDecrypt = Array.from(new Uint8Array(dataDecryptArray)).map(b => String.fromCharCode(b)).join("");
        return dataDecrypt;
    }

    private normalizar(text: string): string {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    private arrayBufferToString64(arrayBuffer: ArrayBuffer): string {
        const base64 = btoa(Array.from(new Uint8Array(arrayBuffer)).map(b => String.fromCharCode(b)).join(""));
        return base64.replaceAll('=', '').replaceAll('+', '-').replaceAll('/', '_');
    }

    private string64ToArrayBuffer(string64: string): ArrayBuffer {
        const base64 = string64.replaceAll('-', '+').replaceAll('_', '/');
        return new Uint8Array(atob(base64).split("").map(c => c.charCodeAt(0)));
    }

    private createArrayBuffer(size: number): ArrayBuffer {
        const array = new Uint8Array(size);
        crypto.getRandomValues(array);
        return array;
    }

    private async getDerivedKey(key: CryptoKey, saltArray: ArrayBuffer): Promise<CryptoKey> {
        const keyAlgorithm: Pbkdf2Params = { name: "PBKDF2", hash: "SHA-256", salt: saltArray, iterations: 100000 };
        const derivedKeyType: AesDerivedKeyParams = { name: "AES-GCM", length: 256 };
        const derivedKey = await crypto.subtle.deriveKey(keyAlgorithm, key, derivedKeyType, true, ["encrypt", "decrypt"]);
        return derivedKey;
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