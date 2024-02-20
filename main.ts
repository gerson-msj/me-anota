import BaseController from "./api/controllers/BaseController.ts";
import Context from "./api/controllers/Context.ts";
import PageController from "./api/controllers/PageController.ts";
import CriarController from "./api/controllers/CriarController.ts";

const page = BaseController.createInstance(PageController);

const handler = async (request: Request): Promise<Response> => {

    const context = new Context(request);

    if (context.isApiRequest) {
        await context.openKv();
        const criar = new CriarController();
        const controllers = BaseController.enlistHandlers(
            criar
        );

        return controllers.handle(context);
    } else {
        return page.handle(context);
    }
};

Deno.serve(handler);