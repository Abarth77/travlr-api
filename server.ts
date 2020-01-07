import * as Koa from 'koa';
import * as json from 'koa-json';
import * as logger from 'koa-logger';
import * as Router from 'koa-router';
import * as cors from 'koa2-cors';

import { FlightRouter } from './api/flights/Flights.routes';
import { WeatherRouter } from './api/weather/Weather.routes';

const app = new Koa();
const router = new Router();

const weatherRouter = new WeatherRouter(router);
const flightRouter = new FlightRouter(router);

app
.use(cors())
.use(logger())
.use(json());

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
});

router.get('/weather', async (ctx) => (ctx.body = await weatherRouter.getWeather()));
router.get('/flights', async (ctx) => (ctx.body = await flightRouter.getFlights()));

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);


// API build based on
// https://codeburst.io/lets-build-an-api-with-koa-part-2-34d943e900a1

// https://rapidapi.com/
// API provider for now

// Cronjob library
// https://www.npmjs.com/package/node-schedule
// const scheduler = require('node-schedule');
