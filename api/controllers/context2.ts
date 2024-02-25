export default class Context {

    request: Request;
    url: URL;
    
    private _kv: Deno.Kv | null = null;
    public get kv() { return this._kv!; }

    public get isApiRequest(): boolean {
        return this.url.pathname.startsWith("/api");
    }

    constructor(request: Request) {
        this.request = request;
        this.url = new URL(request.url);
    }

    public async openKv(): Promise<void> {
        if (this._kv === null)
            this._kv = await Deno.openKv();
    }

    public badRequest(message: string): Response {
        return new Response(JSON.stringify({ message: message }), { status: 400, headers: { "content-type": "application/json; charset=utf-8" } });
    }

    public ok<T>(obj: T): Response {
        return new Response(JSON.stringify(obj), { status: 200, headers: { "content-type": "application/json; charset=utf-8" } });
    }

}