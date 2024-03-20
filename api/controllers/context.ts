import ServerCrypt from "../services/server.crypt.ts";

export default class Context {

    public request: Request;
    public url: URL;
    private crypt: ServerCrypt;

    private _kv: Deno.Kv | null = null;
    public get kv() { return this._kv!; }

    private _nomeHash: string | null = null;
    public get nomeHash() { return this._nomeHash; }

    public get isApiRequest(): boolean {
        return this.url.pathname.startsWith("/api");
    }

    constructor(request: Request) {
        this.request = request;
        this.url = new URL(request.url);
        this.crypt = new ServerCrypt();
    }

    public async openKv(): Promise<void> {
        if (this._kv === null)
            this._kv = await Deno.openKv();
    }

    public async readBearer(): Promise<void> {

        try {
            this._nomeHash = null;

            const auth = this.request.headers.get("authorization");
            if (auth == null)
                return;

            const token = auth.split(" ")[1];
            if (await this.crypt.tokenValido(token) && !this.crypt.tokenExpirado(token))
                this._nomeHash = this.crypt.tokenSub(token);

        } catch (_) {
            // Tokens inválidos ou expirados serão tratados como não autenticados nas páginas que precisam de autenticação.
        }

    }

    public badRequest(message: string): Response {
        return new Response(JSON.stringify({ message: message }), { status: 400, headers: { "content-type": "application/json; charset=utf-8" } });
    }

    public ok<T>(obj: T): Response {
        return new Response(JSON.stringify(obj), { status: 200, headers: { "content-type": "application/json; charset=utf-8" } });
    }

}