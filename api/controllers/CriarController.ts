import BaseController from "./BaseController.ts";
import Context from "./Context.ts";

export default class CriarController extends BaseController {

    constructor() {
        super();
    }

    public handle(context: Context): Promise<Response> {
        const isCriar = context.url.pathname === "/api/criar";
        
        if(isCriar && context.request.method == "GET")
            return this.existeBloco(context);

        return this.nextHandle(context);
    }

    async existeBloco(context: Context): Promise<Response> {
        
        if(!context.url.searchParams.has("nota"))
            return context.badRequest("A nota não foi informada!");

        const nota = context.url.searchParams.get("nota")!;
        const data = await context.kv.get([nota, 0]);

        console.log("Nota consultada: ", data.key);

        return context.ok({existe: data.versionstamp !== null});
    }
}