import { Application } from 'express';
import { createExpressServer } from 'routing-controllers';
import request from 'supertest';
import { CONFIG } from './Core/config';
import useLoaders from './Loaders/bootstrapLoader';

describe('App', () => {
    let app: Application;

    beforeAll(async () => {
        app = createExpressServer(CONFIG.routingControllersOptions);
        useLoaders(app);
    });

    it('Should up the server', function (done) {
        request(app).get('/healthcheck').expect('Content-type', /json/).expect(200, done);
    });
});
