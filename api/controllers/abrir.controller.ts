import BaseController from "./base.controller.ts";
import Context from "./context.ts";
import ServerCrypt from "../services/server.crypt.ts";

export default class AbrirController extends BaseController {

    private crypt: ServerCrypt;

    constructor() {
        super();
        this.crypt = new ServerCrypt();
    }

    public handle(context: Context): Promise<Response> {
        const isAbrir = context.url.pathname === "/api/abrir";

        if (isAbrir && context.request.method == "GET")
            return this.abrir(context);

        return this.nextHandle(context);
    }

    async abrir(context: Context): Promise<Response> {

        if (!context.url.searchParams.has("nomeHash") || !context.url.searchParams.has("senhaHash"))
            return context.badRequest("Parâmetros inválidos");

        const nomeHash = context.url.searchParams.get("nomeHash")!;
        const senhaHash = context.url.searchParams.get("senhaHash")!;

        const v = await context.kv.get([nomeHash, 0]);

        const result: { ok: boolean, token: string | null } = { ok: false, token: null };

        if (v.value !== null) {
            const data = v.value as { senhaSH: string };
            const senhaValida = await this.crypt.validarSenha(senhaHash, data.senhaSH);
            result.ok = senhaValida;
            result.token = senhaValida ? await this.crypt.criarToken(nomeHash) : null;
        }

        return context.ok(result);

    }

}