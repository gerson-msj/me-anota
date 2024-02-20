export default class CryptoService {
    encoder;
    constructor() {
        this.encoder = new TextEncoder();
    }
    async ObterHash(text) {
        const textNormalized = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const hashBuffer = await crypto.subtle.digest("SHA-256", this.encoder.encode(textNormalized));
        const hash = this.bufferToString64(hashBuffer);
        return hash;
    }
    bufferToString64(buffer) {
        return btoa(Array.from(new Uint8Array(buffer)).map(b => String.fromCharCode(b)).join(""));
    }
}
//# sourceMappingURL=CryptoService.js.map