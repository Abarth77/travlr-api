import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as Router from 'koa-router';

require("@babel/register")({extensions: ['.js', '.ts']});

// API build based on
// https://codeburst.io/lets-build-an-api-with-koa-part-2-34d943e900a1

// https://rapidapi.com/
// API provider for now

// Cronjob library
// https://www.npmjs.com/package/node-schedule
// const scheduler = require('node-schedule');

const app = new Koa();

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

require('../api/external/weather/Weather.routes')({ weatherRouter });

app.use(weatherRouter.routes());
app.use(weatherRouter.allowedMethods());

const server = app.listen(3000);
module.exports = server;