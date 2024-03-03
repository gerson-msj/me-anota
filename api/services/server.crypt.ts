export default class ServerCrypt {
    private encoder: TextEncoder;

    constructor() {
        this.encoder = new TextEncoder();
    }

    public async criptografarSenha(senha: string): Promise<string> {
        const saltArray = this.createArrayBuffer(16);
        const salt = this.bufferToBase64(saltArray);
        const senhaData = this.encoder.encode(`${senha}+${salt}`);
        const senhaBuffer = await crypto.subtle.digest("SHA-256", senhaData);
        const senhaCrypto = this.bufferToBase64(senhaBuffer);
        return `${salt}.${senhaCrypto}`;
    }

    public async criarToken(nomeBloco: string): Promise<string> {
        const key = await this.getTokenKey();
        
        const header = this.stringToBase64(JSON.stringify({ "alg": "HS256", "typ": "JWT" }));

        const expTime = new Date();
        expTime.setHours(expTime.getHours() + 1);
        const exp = Math.floor(expTime.getTime() / 1000);
        const payload = this.stringToBase64(JSON.stringify({ "sub": nomeBloco, "exp": exp }));
        
        const data = this.encoder.encode(`${header}.${payload}`);

        const signArray = await crypto.subtle.sign("HMAC", key, data);
        const sign = this.bufferToBase64(signArray);

        const token = `${header}.${payload}.${sign}`;
        return token;
    }

    private getTokenKey(): Promise<CryptoKey> {
        const keyRaw = Deno.env.get("TOKENRAWKEY") ?? "Drp-lS7M0GIRfaMzmhIbLLfeoak4ANIA8Ennj3qDZZyWNvr9laro3rA1foluO466FwKOk6HZ_O03InFjO_ABag";
        const keyData = this.encoder.encode(keyRaw);
        const algorithm: HmacKeyGenParams = { name: "HMAC", hash: { name: "SHA-256" } };
        return crypto.subtle.importKey("raw", keyData, algorithm, false, ["sign", "verify"]);
    }

    private bufferToBase64(arrayBuffer: ArrayBuffer): string {
        const base64 = btoa(Array.from(new Uint8Array(arrayBuffer)).map(b => String.fromCharCode(b)).join(""));
        return base64.replaceAll('=', '').replaceAll('+', '-').replaceAll('/', '_');
    }

    private stringToBase64(text: string): string {
        const base64 = btoa(text);
        const base64Safe = base64.replaceAll('=', '').replaceAll('+', '-').replaceAll('/', '_');
        return base64Safe;
    }

    private base64ToBuffer(base64: string): ArrayBuffer {
        const base64Unsafe = base64.replaceAll('-', '+').replaceAll('_', '/');
        return new Uint8Array(atob(base64Unsafe).split("").map(c => c.charCodeAt(0)));
    }

    private createArrayBuffer(size: number): ArrayBuffer {
        const array = new Uint8Array(size);
        crypto.getRandomValues(array);
        return array;
    }
}