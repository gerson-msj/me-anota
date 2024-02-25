import BaseController from "./base.controller.ts";
import Context from "./context.ts";

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

        if (!context.url.searchParams.has("nomeBloco"))
            return context.badRequest("Parâmetros inválidos");

        const nomeBloco = context.url.searchParams.get("nomeBloco")!;
        
        await context.kv.delete([nomeBloco, 0]);
        
        const data = await context.kv.get([nomeBloco, 0]);
        return context.ok({ existe: data.versionstamp !== null });

    }

    async criarBloco(context: Context): Promise<Response> {
        const body: { nomeBloco: string, bloco: string } = await context.request.json();
        const data = await context.kv.set([body.nomeBloco, 0], body.bloco);
        return context.ok(data);
    }
}