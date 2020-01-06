require("@babel/register")({extensions: ['.js', '.ts']});

import Koa from 'koa';
import logger from 'koa-logger';
import Router from 'koa-router';
import cors from 'koa2-cors';
const app = new Koa();

import { getWeather } from './api/weather/Weather.routes';
import { getFlights } from './api/flights/Flights.routes';

// API build based on
// https://codeburst.io/lets-build-an-api-with-koa-part-2-34d943e900a1

// https://rapidapi.com/
// API provider for now

// Cronjob library
// https://www.npmjs.com/package/node-schedule
// const scheduler = require('node-schedule');

app.use(cors());
app.use(logger());

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
});

const weatherRouter = new Router({
    prefix: '/weather'
});

getWeather({weatherRouter});

app.use(weatherRouter.routes());
app.use(weatherRouter.allowedMethods());

const flightsRouter = new Router({
    prefix: '/flights'
});

getFlights({flightsRouter});

app.use(flightsRouter.routes());
app.use(flightsRouter.allowedMethods());

const server = app.listen(3000);
export default server;
