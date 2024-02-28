export default class CryptoApiService {
    private encoder: TextEncoder;

    constructor() {
        this.encoder = new TextEncoder();
    }

    public async criptografarSenha(senha: string): Promise<string> {
        const saltArray = this.createArrayBuffer(16);
        const salt = this.arrayBufferToString64(saltArray);
        const senhaData = this.encoder.encode(`${senha}+${salt}`);
        const senhaBuffer = await crypto.subtle.digest("SHA-256", senhaData);
        const senhaCrypto = this.arrayBufferToString64(senhaBuffer);
        return `${salt}.${senhaCrypto}`;
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
}