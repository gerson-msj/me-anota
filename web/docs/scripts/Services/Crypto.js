export default class Crypto {
    encoder;
    constructor() {
        this.encoder = new TextEncoder();
    }
    async ObterHash(text) {
        const textNormalized = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const hashBuffer = await crypto.subtle.digest("SHA-256", this.encoder.encode(textNormalized));
        const hash = this.arrayBufferToString64(hashBuffer);
        return hash;
    }
    async Criptografar(senha, obj) {
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
    arrayBufferToString64(arrayBuffer) {
        return btoa(Array.from(new Uint8Array(arrayBuffer)).map(b => String.fromCharCode(b)).join(""));
    }
    createArrayBuffer(size) {
        const array = new Uint8Array(size);
        crypto.getRandomValues(array);
        return array;
    }
    async getkey(keyData, saltArray) {
        const baseKey = await crypto.subtle.importKey("raw", keyData, "PBKDF2", false, ["deriveKey"]);
        const keyAlgorithm = { name: "PBKDF2", hash: "SHA-256", salt: saltArray, iterations: 100000 };
        const derivedKeyType = { name: "AES-GCM", length: 256 };
        const key = await crypto.subtle.deriveKey(keyAlgorithm, baseKey, derivedKeyType, true, ["encrypt", "decrypt"]);
        return key;
    }
    async encrypt(key, data, ivArray) {
        const encryptAlgorithm = { name: "AES-GCM", iv: ivArray };
        const dataCryptBuffer = await crypto.subtle.encrypt(encryptAlgorithm, key, data);
        const dataCryptArray = new Uint8Array(dataCryptBuffer);
        return dataCryptArray;
    }
}
//# sourceMappingURL=Crypto.js.map