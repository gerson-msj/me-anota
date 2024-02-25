export default class ApiService {
    baseUrl;
    /**
     *
     */
    constructor(baseUrl) {
        this.baseUrl = `/api/${baseUrl}`;
    }
    async doGet(searchParams) {
        const url = `${this.baseUrl}?${searchParams}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    async doPost(obj) {
        const response = await fetch(this.baseUrl, {
            method: "POST",
            headers: { "content-type": "application/json; charset=utf-8" },
            body: JSON.stringify(obj)
        });
        const data = await response.json();
        return data;
    }
}
//# sourceMappingURL=api.js.map