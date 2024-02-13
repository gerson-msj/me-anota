export default class Context {

    request: Request;
    url: URL;
    
    public get isApiRequest() : boolean {
        return this.url.pathname.startsWith("/api");
    }

    constructor(request: Request) {
        this.request = request;
        this.url = new URL(request.url);
    }

    public badRequest(message: string) : Response {
        return new Response(JSON.stringify({message: message}), { status: 400, headers: { "content-type": "application/json; charset=utf-8" } });
    }

    public ok(message: string) : Response {
        return new Response(JSON.stringify({message: message}), { status: 200, headers: { "content-type": "application/json; charset=utf-8" } });
    }

}