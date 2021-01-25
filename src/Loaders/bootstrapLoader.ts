import { Application } from 'express';
import useExpressStatusMonitor from './ExpressStatusMonitor';
import useHealthcheck from './HealthCheck';
import useSwaggerUIExpress from './SwaggerUI';
import useWinstonLogs from './WinstonLogger';

/**
 * Apply the loaders to the app
 *
 * @param app The Express app object
 */
export default function useLoaders(app: Application): void {
    useExpressStatusMonitor(app);
    useHealthcheck(app);
    useSwaggerUIExpress(app);
    useWinstonLogs(app);
}
