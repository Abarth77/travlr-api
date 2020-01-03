const request = require('superagent');

module.exports = ({ weatherRouter }) => {
    const endpoint = 'https://community-open-weather-map.p.rapidapi.com/weather';

    const headers = {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': 'J1dOR0FKn2msh1BiRunoND3e0hZNp1F3K0Njsnoo8N3gZq7wo6'
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
        .query(required_parameters)
        .then(response => {
            ctx.body = response.body;
        })
        .catch(error => {
            throw new Error(error);
        });
    });
};