export default class ServerHandler {
    baseUrl;
    /**
     *
     */
    constructor(baseUrl) {
        this.baseUrl = `/api/${baseUrl}`;
    }
    async doGet(searchParams, bearer = null) {
        const url = searchParams ? `${this.baseUrl}?${searchParams}` : this.baseUrl;
        const response = await fetch(url, {
            method: "GET",
            headers: this.getHeaders(bearer)
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        else {
            throw new Error(response.statusText);
        }
    }
    async doPost(obj, bearer = null) {
        const response = await fetch(this.baseUrl, {
            method: "POST",
            headers: this.getHeaders(bearer),
            body: JSON.stringify(obj)
        });
        const data = await response.json();
        return data;
    }
    getHeaders(bearer) {
        const headers = { "content-type": "application/json; charset=utf-8" };
        if (bearer !== null)
            headers["authorization"] = `Bearer ${bearer}`;
        return headers;
    }
}
//# sourceMappingURL=server.handler.js.map