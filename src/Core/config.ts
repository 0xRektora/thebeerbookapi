import controllers from '../Services/bootstrapControllers';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { getMetadataArgsStorage, RoutingControllersOptions } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import appMiddlewares from '../Middlewares/appMiddlewares';

// Port of the app
const port = process.env.PORT ?? 4000;

// The app base routes
const routes = {
    api: process.env.ROUTE_PREFIX,
    swagger: '/docs',
    monitor: '/status',
    healthCheck: '/healthcheck',
};

// Code routing handler
const routingControllersOptions: RoutingControllersOptions = {
    controllers,
    routePrefix: routes.api,
    cors: true,
    middlewares: appMiddlewares,
};

// Schema generation, used for Swagger
const schemas = validationMetadatasToSchemas({
    refPointerPrefix: '#/components/schemas/',
});

// Used for Swagger
const storage = getMetadataArgsStorage();

// Spec of the generated Swagger UI
const spec = routingControllersToSpec(storage, routingControllersOptions, {
    components: {
        schemas,
    },
    info: {
        title: 'TheBeerBook API',
        description: 'Generated with `routing-controllers-openapi`',
        version: '1.0.0',
    },
});

// Where to output the logs
const logs = {
    filename: process.env.LOGS_FILE ?? 'app.logs',
};

const CONFIG = {
    port,
    routes,
    routingControllersOptions,
    schemas,
    storage,
    spec,
    logs,
};

export default CONFIG;
