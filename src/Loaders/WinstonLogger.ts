import { Application } from 'express';
import expressWinston from 'express-winston';
import winston from 'winston';
import CONFIG from '../Core/config';

/**
 * Activate the Express-Winston for the logs
 *
 * @param app The EXPRESS app object
 */
export default function useWinstonLogs(app: Application): void {
    // For the console
    app.use(
        expressWinston.logger({
            transports: [new winston.transports.Console()],
            format: winston.format.combine(winston.format.colorize(), winston.format.prettyPrint()),
            msg: 'HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}',
            meta: false,
            colorize: true,
        }),
    );
    // For a file
    app.use(
        expressWinston.logger({
            transports: [new winston.transports.File({ filename: CONFIG.logs.filename })],
            format: winston.format.combine(winston.format.prettyPrint()),
            expressFormat: true,
        }),
    );
}
