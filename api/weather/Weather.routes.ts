'use strict';

import * as request from 'superagent';

const endpoint = 'https://community-open-weather-map.p.rapidapi.com/weather';

const headers = {
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
    'x-rapidapi-key': 'J1dOR0FKn2msh1BiRunoND3e0hZNp1F3K0Njsnoo8N3gZq7wo6',
};

const requiredParameters = {
    q: 'London,uk',
};

const optionalParameters = {
    callback: '',
    id: 0,
    lang: '',
    lat: 0,
    lon: 0,
    mode: '',
    units: 'metric',
};

export class WeatherRouter {

    public router: any;

    constructor(router: any) {
        this.router = router;
    }

    public async getWeather() {
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
