export default class CryptoService {
    encoder;
    constructor() {
        this.encoder = new TextEncoder();
    }
    normalizar(text) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }
    async obterHash(text) {
        const hashBuffer = await crypto.subtle.digest("SHA-256", this.encoder.encode(text));
        const hash = this.arrayBufferToString64(hashBuffer);
        return hash;
    }
    async criarToken(nomeBloco, senha) {
        const hashNomeBloco = await this.obterHash(this.normalizar(nomeBloco));
        const hashSenha = await this.obterHash(`${nomeBloco}${senha}`);
        return `${hashNomeBloco}.${hashSenha}`;
    }
    async criptografar(senha, obj) {
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
    async descriptografar(senha, msgCrypt) {
        const keyData = this.encoder.encode(senha);
        const [salt, iv, dataCrypt] = msgCrypt.split(".");
        const saltArray = this.string64ToArrayBuffer(salt);
        const ivArray = this.string64ToArrayBuffer(iv);
        const dataArray = this.string64ToArrayBuffer(dataCrypt);
        const key = await this.getkey(keyData, saltArray);
        const dataDecryptArray = await this.decrypt(key, dataArray, ivArray);
        const dataDecrypt = Array.from(new Uint8Array(dataDecryptArray)).map(b => String.fromCharCode(b)).join("");
        const data = JSON.parse(dataDecrypt);
        return data;
    }
    arrayBufferToString64(arrayBuffer) {
        return btoa(Array.from(new Uint8Array(arrayBuffer)).map(b => String.fromCharCode(b)).join(""));
    }
    string64ToArrayBuffer(string64) {
        return new Uint8Array(atob(string64).split("").map(c => c.charCodeAt(0)));
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
    async decrypt(key, data, ivArray) {
        const decryptAlgorithm = { name: "AES-GCM", iv: ivArray };
        const dataDecryptBuffer = await crypto.subtle.decrypt(decryptAlgorithm, key, data);
        const dataDecryptArray = new Uint8Array(dataDecryptBuffer);
        return dataDecryptArray;
    }
}
//# sourceMappingURL=crypto.js.map