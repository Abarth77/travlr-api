const request = require('superagent');

module.exports = ({ weatherRouter }) => {
    const endpoint = 'https://community-open-weather-map.p.rapidapi.com/weather';

    const headers = {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': 'J1dOR0FKn2msh1BiRunoND3e0hZNp1F3K0Njsnoo8N3gZq7wo6',
        'access-control-allow-origin': '*', // http://localhost:8080/
        'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept'
    };

    const required_parameters = {
        q: 'London,uk'
    };

    const optional_parameters = {
        lat: 0,
        lon: 0,
        callback: '',
        id: 0,
        lang: '',
        units: 'metric',
        mode: ''
    };

    weatherRouter.get('/', async (ctx, next) => {
        await request
        .get(endpoint)
        .set('X-RapidAPI-Host', headers['x-rapidapi-host'])
        .set('X-RapidAPI-Key', headers['x-rapidapi-key'])
        .set('Access-Control-Allow-Origin', headers['access-control-allow-origin'])
        .set('Access-Control-Allow-Headers', headers['access-control-allow-headers'])
        .query(required_parameters)
        .then(response => {
            ctx.body = response.body;
        })
        .catch(error => {
            throw new Error(error);
        });
    });
};