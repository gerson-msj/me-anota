import Context from "./context2.ts";

export default interface IController {
    setNext(controller: IController): IController;
    handle(context: Context): Promise<Response>;
}