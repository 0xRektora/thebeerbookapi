import { createLogger, transports } from 'winston';

// Where to output the logs
export const logs = {
    filename: process.env.LOGS_FILE ?? 'app.logs',
};
export const LOGGER = createLogger({
    transports: [new transports.Console(), new transports.File({ filename: logs.filename })],
});
