import { Application } from 'express';
import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import CONFIG from './Core/config';
import useLoaders from './Loaders/bootstrapLoader';

export const bootstrap = (app: Application): void => {
    useLoaders(app);

    app.listen(CONFIG.port, () => {
        return console.log(`Server is listening on ${CONFIG.port}`);
    });
};

const app: Application = createExpressServer(CONFIG.routingControllersOptions);
bootstrap(app);
