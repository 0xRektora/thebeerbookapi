import controllers from '../Services/bootstrapControllers';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';

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
const routingControllersOptions = {
    controllers,
    routePrefix: routes.api,
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

const CONFIG = {
    port,
    routes,
    routingControllersOptions,
    schemas,
    storage,
    spec,
};

export default CONFIG;
