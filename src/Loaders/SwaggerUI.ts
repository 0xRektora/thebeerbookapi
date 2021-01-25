import { Application } from 'express';
import CONFIG from '../Core/config';
import * as swaggerUiExpress from 'swagger-ui-express';

// Should we activate or not the Swagger UI Express
const applySwaggerUI = Boolean(process.env.SWAGGER);

/**
 * Activate the SwaggerUIExpress route
 *
 * @param app The EXPRESS app object
 */
export default function useSwaggerUIExpress(app: Application): void {
    applySwaggerUI && app.use(CONFIG.routes.swagger, swaggerUiExpress.serve, swaggerUiExpress.setup(CONFIG.spec));
}
