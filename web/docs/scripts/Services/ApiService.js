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
}
//# sourceMappingURL=ApiService.js.map