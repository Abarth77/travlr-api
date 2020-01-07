'use strict';

import * as request from 'superagent';

const endpoint = 'https://tripadvisor1.p.rapidapi.com/flights/create-session';

const headers = {
    'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
    'x-rapidapi-key': 'J1dOR0FKn2msh1BiRunoND3e0hZNp1F3K0Njsnoo8N3gZq7wo6',
};

const requiredParameters = {
	c: '0',
	currency: 'USD',
	d1: 'CNX',
	dd1: '2020-01-08',
	o1: 'DMK',
	ta: '1',
	tc: '11%2C5',
};

export class FlightRouter {

    public router: any;

    constructor(router: any) {
        this.router = router;
    }

    public async getFlights() {
        const data = await request.get(endpoint)
        .set('X-RapidAPI-Host', headers['x-rapidapi-host'])
        .set('X-RapidAPI-Key', headers['x-rapidapi-key'])
        .query(requiredParameters)
        .then((response: any) => {
            return response.body;
        })
        .catch((error: any) => {
            throw new Error(error);
        });

        return data;
    }
}