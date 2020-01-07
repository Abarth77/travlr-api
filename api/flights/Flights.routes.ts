'use strict';

import { HttpProvider } from '../../providers/HttpProvider';

const endpoint = 'https://tripadvisor1.p.rapidapi.com/flights/create-session';

const headers = {
    host: 'tripadvisor1.p.rapidapi.com',
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

const httpProvider = new HttpProvider(endpoint, headers, requiredParameters);

export class FlightRouter {

    public async getFlights() {
        return httpProvider.get();
    }

}
