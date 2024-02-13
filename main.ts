import BaseController from "./api/controllers/BaseController.ts";
import Context from "./api/controllers/Context.ts";
import PageController from "./api/controllers/PageController.ts";

const page = BaseController.createInstance(PageController);

const handler = (request:Request): Promise<Response> => {
    const context = new Context(request);
    const controllers = BaseController.enlistHandlers(page);
    return controllers.handle(context);
};

Deno.serve(handler);