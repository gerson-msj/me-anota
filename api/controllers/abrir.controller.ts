import BaseController from "./base.controller.ts";
import Context from "./context2.ts";

export default class AbrirController extends BaseController {

    constructor() {
        super();
    }

    public handle(context: Context): Promise<Response> {
        const isAbrir = context.url.pathname === "/api/abrir";

        if (isAbrir && context.request.method == "GET")
            return this.obterBloco(context);

        return this.nextHandle(context);
    }

    async obterBloco(context: Context): Promise<Response> {

        if (!context.url.searchParams.has("nomeBloco"))
            return context.badRequest("Parâmetros inválidos");

        const nomeBloco = context.url.searchParams.get("nomeBloco")!;
        const data = await context.kv.get([nomeBloco, 0]);
        return context.ok({ bloco: data.value as string | null });

    }

}