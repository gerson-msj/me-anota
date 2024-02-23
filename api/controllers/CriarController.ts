import BaseController from "./BaseController.ts";
import Context from "./Context.ts";

export default class CriarController extends BaseController {

    constructor() {
        super();
    }

    public handle(context: Context): Promise<Response> {
        const isCriar = context.url.pathname === "/api/criar";

        if (isCriar && context.request.method == "GET")
            return this.existeBloco(context);

        if (isCriar && context.request.method == "POST")
            return this.criarBloco(context);

        return this.nextHandle(context);
    }

    async existeBloco(context: Context): Promise<Response> {

        if (!context.url.searchParams.has("hash"))
            return context.badRequest("O hash da nota não foi informado!");

        const hash = context.url.searchParams.get("hash")!;
        //await context.kv.delete([hash, 0]);
        const data = await context.kv.get([hash, 0]);
        return context.ok({ existe: data.versionstamp !== null });

    }

    async criarBloco(context: Context): Promise<Response> {
        const body: { hash: string, nota: string } = await context.request.json();
        const data = await context.kv.set([body.hash, 0], body.nota);
        return context.ok(data);
    }
}