import * as request from 'superagent';

const RapidAPIKey = 'J1dOR0FKn2msh1BiRunoND3e0hZNp1F3K0Njsnoo8N3gZq7wo6';

interface IHeadersObject {
    host: string;
    key?: string;
}

export class HttpProvider {

    public endpoint: string;
    public headers: IHeadersObject;
    public requiredParameters: object;
    public optionalParameters?: object;

    constructor(endpoint: string, headers: IHeadersObject, requiredParameters: object, optionalParameters?: object) {
        this.endpoint = endpoint;
        this.headers = headers;
        this.requiredParameters = requiredParameters;
        this.optionalParameters = optionalParameters;
    }

    public async get() {
        const data = await request.get(this.endpoint)
        .set('X-RapidAPI-Host', this.headers.host)
        .set('X-RapidAPI-Key', this.headers.key || RapidAPIKey)
        .query(this.requiredParameters)
        .then((response: any) => {
            return response.body;
        })
        .catch((error: any) => {
            throw new Error(error);
        });

        return data;
    }
}
