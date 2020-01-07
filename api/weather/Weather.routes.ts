'use strict';

import { HttpProvider } from '../../providers/HttpProvider';

const endpoint = 'https://community-open-weather-map.p.rapidapi.com/weather';

const headers = {
    host: 'community-open-weather-map.p.rapidapi.com',
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

const httpProvider = new HttpProvider(endpoint, headers, requiredParameters, optionalParameters);

export class WeatherRouter {

    public async getWeather() {
        return httpProvider.get();
    }

}
