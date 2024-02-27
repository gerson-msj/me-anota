import BaseController from "./base.controller.ts";
import Context from "./context.ts";

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
        // receber senha.
        if (!context.url.searchParams.has("nomeBloco"))
            return context.badRequest("Parâmetros inválidos");

        const nomeBloco = context.url.searchParams.get("nomeBloco")!;
        const data = await context.kv.get([nomeBloco, 0]);

        // validar senha.
        // criar jwt
        // retornar nome do bloco e jwt
        return context.ok({ bloco: data.value as string | null });

    }

}