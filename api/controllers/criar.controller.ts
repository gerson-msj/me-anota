import BaseController from "./base.controller.ts";
import Context from "./context.ts";
import ServerCrypt from "../services/server.crypt.ts";

export default class CriarController extends BaseController {

    private crypt: ServerCrypt;

    constructor() {
        super();
        this.crypt = new ServerCrypt();
    }

    public handle(context: Context): Promise<Response> {
        const isCriar = context.url.pathname === "/api/criar";

        if (isCriar && context.request.method == "GET")
            return this.consultar(context);

        if (isCriar && context.request.method == "POST")
            return this.criar(context);

        return this.nextHandle(context);
    }

    async consultar(context: Context): Promise<Response> {

        if (!context.url.searchParams.has("nomeHash"))
            return context.badRequest("Parâmetros inválidos");

        const nomeHash = context.url.searchParams.get("nomeHash")!;
        
        // remover após testes!!!!
        await context.kv.delete([nomeHash, 0]);

        const data = await context.kv.get([nomeHash, 0]);
        return context.ok({ existe: data.versionstamp !== null });

    }

    async criar(context: Context): Promise<Response> {
        const bloco: { nomeHash: string, senhaHash: string, nomeCryp: string } = await context.request.json();
        const senhaSH = await this.crypt.criptografarSenha(bloco.senhaHash);
        const k: Deno.KvKey = [bloco.nomeHash, 0];
        const v = { nomeCryp: bloco.nomeCryp, senhaSH: senhaSH, ids: 0 };
        const kvData = await context.kv.set(k, v);
        const token = kvData.ok ? await this.crypt.criarToken(bloco.nomeHash) : null;
        return context.ok({ok: kvData.ok, token: token});
    }
}