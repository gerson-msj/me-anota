import BaseController from "./base.controller.ts";
import Context from "./context.ts";

export default class AnotacoesController extends BaseController {

    constructor() {
        super();
    }

    public handle(context: Context): Promise<Response> {
        const isAnotacoes = context.url.pathname === "/api/anotacoes";

        if (isAnotacoes && context.request.method == "GET")
            return this.consultar(context);

        return this.nextHandle(context);
    }

    private consultar(context: Context): Promise<Response> {

        return Promise.resolve(context.ok({}));

    }
}