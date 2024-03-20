import BaseController from "./api/controllers/base.controller.ts";
import Context from "./api/controllers/context.ts";
import PageController from "./api/controllers/page.controller.ts";
import CriarController from "./api/controllers/criar.controller.ts";
import AbrirController from "./api/controllers/abrir.controller.ts";


const page = BaseController.createInstance(PageController);

const handler = async (request: Request): Promise<Response> => {
    
    const context = new Context(request);
    if (context.isApiRequest) {

        await Promise.all([
            context.openKv(),
            context.readBearer()
        ]);
        
        const criar = new CriarController();
        const abrir = new AbrirController();
        const controllers = BaseController.enlistHandlers(
            criar, abrir
        );

        return controllers.handle(context);
    } else {
        return page.handle(context);
    }
};

Deno.serve(handler);