import ClientCrypt from "./services/client.crypt.js";
import ServerHandler from "./services/server.handler.js";
export default class BaseService {
    crypt;
    handler;
    constructor(baseUrl) {
        this.crypt = new ClientCrypt();
        this.handler = new ServerHandler(baseUrl);
    }
}
//# sourceMappingURL=base.service.js.map