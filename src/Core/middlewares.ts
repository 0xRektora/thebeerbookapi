import compression from 'compression';
import { Application } from 'express';
import monitor from 'express-status-monitor';
import helmet from 'helmet';
import * as swaggerUiExpress from 'swagger-ui-express';
import CONFIG from './config';
//@ts-ignore
import healthcheck from 'express-healthcheck';

// Should we activate or not the Express Status Monitor
const applyMonitor = Boolean(process.env.MONITOR);

// Should we activate or not the Swagger UI Express
const applySwaggerUI = Boolean(process.env.SWAGGER);

const middlewares = [helmet, compression, ...(applyMonitor ? [monitor] : [])];

export const applyMiddleware = (app: Application): void => {
    middlewares.forEach((e) => app.use(e()));
    useHealthcheck(app);
    applySwaggerUI && useSwaggerUIExpress(app);
};

/**
 * Activate the SwaggerUIExpress route
 *
 * @param app The EXPRESS app object
 */
function useSwaggerUIExpress(app: Application): void {
    app.use(CONFIG.routes.swagger, swaggerUiExpress.serve, swaggerUiExpress.setup(CONFIG.spec));
}

/**
 * Activate the healthcheck route
 *
 * @param app The EXPRESS app object
 */
function useHealthcheck(app: Application): void {
    app.use(CONFIG.routes.healthCheck, healthcheck());
}
