import * as express from 'express';
import helmet from 'helmet';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'before' })
export class HelmetGuardMiddleware implements ExpressMiddlewareInterface {
    public use(req: express.Request, res: express.Response, next: express.NextFunction): void {
        return helmet()(req, res, next);
    }
}
