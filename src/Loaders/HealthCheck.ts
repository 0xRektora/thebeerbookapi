import { Application } from 'express';
import CONFIG from '../Core/config';
//@ts-ignore
import healthcheck from 'express-healthcheck';
/**
 * Activate the healthcheck route
 *
 * @param app The EXPRESS app object
 */
export default function useHealthcheck(app: Application): void {
    app.use(CONFIG.routes.healthCheck, healthcheck());
}
