export default class CryptoService {

    private encoder: TextEncoder;

    constructor() {
        this.encoder = new TextEncoder();
    }

    async ObterHash(text: string): Promise<string> {
        const textNormalized = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const hashBuffer = await crypto.subtle.digest("SHA-256", this.encoder.encode(textNormalized));
        const hash = this.bufferToString64(hashBuffer);
        return hash;
    }

    private bufferToString64(buffer: ArrayBuffer) {
        return btoa(Array.from(new Uint8Array(buffer)).map(b => String.fromCharCode(b)).join(""));
    }

}