import BaseController from "./base.controller.ts";
import Context from "./context.ts";
import CryptoApiService from "../services/crypto.api.service.ts";

export default class CriarController extends BaseController {

    private crypto: CryptoApiService;

    constructor() {
        super();
        this.crypto = new CryptoApiService();
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
        const bloco: { token: string, nome: string } = await context.request.json();
        const [nomeBloco, senha] = bloco.token.split(".");
        const senhaCrypto = await this.crypto.criptografarSenha(senha);
        const k: Deno.KvKey = [nomeBloco, 0];
        const v = { nome: bloco.nome, senha: senhaCrypto, ids: 0 };
        const kvData = await context.kv.set(k, v);
        // criar e devolver jwt (nomeBloco, 15 min de validade).
        return context.ok(kvData);
    }
}