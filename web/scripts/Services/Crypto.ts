export default class Crypto {

    private encoder: TextEncoder;

    constructor() {
        this.encoder = new TextEncoder();
    }

    async ObterHash(text: string): Promise<string> {
        const textNormalized = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const hashBuffer = await crypto.subtle.digest("SHA-256", this.encoder.encode(textNormalized));
        const hash = this.arrayBufferToString64(hashBuffer);
        return hash;
    }

    async Criptografar<T>(senha: string, obj: T): Promise<string> {
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

    private arrayBufferToString64(arrayBuffer: ArrayBuffer) {
        return btoa(Array.from(new Uint8Array(arrayBuffer)).map(b => String.fromCharCode(b)).join(""));
    }

    private createArrayBuffer(size: number): ArrayBuffer {
        const array = new Uint8Array(size);
        crypto.getRandomValues(array);
        return array;
    }

    async getkey(keyData: BufferSource, saltArray: ArrayBuffer): Promise<CryptoKey> {
        const baseKey = await crypto.subtle.importKey(
            "raw", keyData, "PBKDF2", false, ["deriveKey"]
        );

        const keyAlgorithm: Pbkdf2Params = { name: "PBKDF2", hash: "SHA-256", salt: saltArray, iterations: 100000 };
        const derivedKeyType: AesDerivedKeyParams = { name: "AES-GCM", length: 256 };
        const key = await crypto.subtle.deriveKey(keyAlgorithm, baseKey, derivedKeyType, true, ["encrypt", "decrypt"]);
        return key;
    }

    async encrypt(key: CryptoKey, data: BufferSource, ivArray: ArrayBuffer): Promise<ArrayBuffer> {
        const encryptAlgorithm: AesGcmParams = { name: "AES-GCM", iv: ivArray };
        const dataCryptBuffer = await crypto.subtle.encrypt(encryptAlgorithm, key, data);
        const dataCryptArray = new Uint8Array(dataCryptBuffer);
        return dataCryptArray;
    }

}