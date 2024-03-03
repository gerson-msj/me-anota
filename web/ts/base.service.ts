import ClientCrypt from "./services/client.crypt.js";
import ServerHandler from "./services/server.handler.js";

export default abstract class BaseService {
    
    protected crypt: ClientCrypt;
    protected handler: ServerHandler;

    constructor(baseUrl: string) {
        this.crypt = new ClientCrypt();
        this.handler = new ServerHandler(baseUrl);
    }
}