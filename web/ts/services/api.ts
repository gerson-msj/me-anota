export default class ApiService {
    private baseUrl: string;

    /**
     *
     */
    constructor(baseUrl: string) {
        this.baseUrl = `/api/${baseUrl}`;
    }

    public async doGet<TResult>(searchParams: URLSearchParams): Promise<TResult> {
        const url = `${this.baseUrl}?${searchParams}`;
        const response = await fetch(url);
        const data: TResult = await response.json();
        return data;
    }

    public async doPost<TResult>(obj: object): Promise<TResult> {
        const response = await fetch(this.baseUrl, {
            method: "POST",
            headers: { "content-type": "application/json; charset=utf-8" },
            body: JSON.stringify(obj)
        });

        const data: TResult = await response.json();
        return data;
    }
}