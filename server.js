require("@babel/register")({extensions: ['.js', '.ts']});

const Koa = require('koa');
const logger = require('koa-logger');
const Router = require('koa-router');
const cors = require('koa2-cors');
const app = new Koa();

const weatherRoutes = require('./api/external/weather/Weather.routes');

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

weatherRoutes.getWeather({weatherRouter});

app.use(weatherRouter.routes());
app.use(weatherRouter.allowedMethods());

const server = app.listen(3000);
module.exports = server;
