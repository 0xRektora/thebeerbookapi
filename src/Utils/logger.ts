import { transports, createLogger } from 'winston';
import CONFIG from '../Core/config';

const logger = createLogger({
    transports: [new transports.Console(), new transports.File({ filename: CONFIG.logs.filename })],
});

export default logger;
