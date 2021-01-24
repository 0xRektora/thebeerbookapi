import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import monitor from 'express-status-monitor';
import dotenv from 'dotenv';

// Load .env file if any
dotenv.config();
/**
 * Todo
 * OpenAPI gen
 * Routing setup
 */

const app = express();
const port = process.env.PORT ?? 4000;
const applyMonitor = Boolean(process.env.MONITOR);

const bootstrap = () => {
    const middlewares = [helmet, compression, ...(applyMonitor ? [monitor] : [])];

    middlewares.forEach((e) => app.use(e()));

    app.get('/', (req, res) => {
        res.send('The sedulous hyena ate the antelope!');
    });
    app.listen(port, () => {
        return console.log(`server is listening on ${port}`);
    });
};

bootstrap();
