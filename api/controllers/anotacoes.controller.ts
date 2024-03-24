import BaseController from "./base.controller.ts";
import Context from "./context.ts";

export default class AnotacoesController extends BaseController {

    constructor() {
        super();
    }

    public handle(context: Context): Promise<Response> {
        const isAnotacoes = context.url.pathname === "/api/anotacoes";

        if (isAnotacoes && context.nomeHash == null)
            return Promise.resolve(context.unauthorized());

        if (isAnotacoes && context.request.method == "GET")
            return this.consultar(context);

        return this.nextHandle(context);
    }

    private async consultar(context: Context): Promise<Response> {

        let blocoCrypt: string | null = null;
        const notasCrypt: string[] = [];

        try {
            const entries = context.kv.list({
                prefix: [context.nomeHash!]
            });

            for await (const entry of entries) {

                if (entry.key[1] == 0) {
                    const data = entry.value as { blocoCrypt: string };
                    blocoCrypt = data.blocoCrypt!;
                }
                else {
                    const data = entry.value as { notaCrypt: string };
                    notasCrypt.push(data.notaCrypt!);
                }

            }

        } catch (error) {
            console.log("anotacoes.consultar: ", context.nomeHash, error);
        }

        return context.ok({ blocoCrypt, notasCrypt });

    }
}