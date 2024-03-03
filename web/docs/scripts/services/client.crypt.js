export default class ClientCrypt {
    encoder;
    constructor() {
        this.encoder = new TextEncoder();
    }
    async obterHash(text) {
        const hashBuffer = await crypto.subtle.digest("SHA-256", this.encoder.encode(text));
        const hash = this.arrayBufferToString64(hashBuffer);
        return hash;
    }
    obterHashNormalizado(text) {
        return this.obterHash(this.normalizar(text));
    }
    obterKey(senhaHash) {
        const keyData = this.encoder.encode(senhaHash);
        return crypto.subtle.importKey("raw", keyData, "PBKDF2", false, ["deriveKey"]);
    }
    async criptografar(key, msg) {
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
    async descriptografar(key, msgCrypt) {
        const [salt, iv, dataCrypt] = msgCrypt.split(".");
        const saltArray = this.string64ToArrayBuffer(salt);
        const ivArray = this.string64ToArrayBuffer(iv);
        const dataArray = this.string64ToArrayBuffer(dataCrypt);
        const derivedKey = await this.getDerivedKey(key, saltArray);
        const dataDecryptArray = await this.decrypt(derivedKey, dataArray, ivArray);
        const dataDecrypt = Array.from(new Uint8Array(dataDecryptArray)).map(b => String.fromCharCode(b)).join("");
        return dataDecrypt;
    }
    normalizar(text) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }
    arrayBufferToString64(arrayBuffer) {
        const base64 = btoa(Array.from(new Uint8Array(arrayBuffer)).map(b => String.fromCharCode(b)).join(""));
        return base64.replaceAll('=', '').replaceAll('+', '-').replaceAll('/', '_');
    }
    string64ToArrayBuffer(string64) {
        const base64 = string64.replaceAll('-', '+').replaceAll('_', '/');
        return new Uint8Array(atob(base64).split("").map(c => c.charCodeAt(0)));
    }
    createArrayBuffer(size) {
        const array = new Uint8Array(size);
        crypto.getRandomValues(array);
        return array;
    }
    async getDerivedKey(key, saltArray) {
        const keyAlgorithm = { name: "PBKDF2", hash: "SHA-256", salt: saltArray, iterations: 100000 };
        const derivedKeyType = { name: "AES-GCM", length: 256 };
        const derivedKey = await crypto.subtle.deriveKey(keyAlgorithm, key, derivedKeyType, true, ["encrypt", "decrypt"]);
        return derivedKey;
    }
    async encrypt(key, data, ivArray) {
        const encryptAlgorithm = { name: "AES-GCM", iv: ivArray };
        const dataCryptBuffer = await crypto.subtle.encrypt(encryptAlgorithm, key, data);
        const dataCryptArray = new Uint8Array(dataCryptBuffer);
        return dataCryptArray;
    }
    async decrypt(key, data, ivArray) {
        const decryptAlgorithm = { name: "AES-GCM", iv: ivArray };
        const dataDecryptBuffer = await crypto.subtle.decrypt(decryptAlgorithm, key, data);
        const dataDecryptArray = new Uint8Array(dataDecryptBuffer);
        return dataDecryptArray;
    }
}
//# sourceMappingURL=client.crypt.js.map