declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PORT: string;
            MONITOR: boolean;
            SWAGGER: boolean;
            ROUTE_PREFIX: string;
        }
    }
}

export {};
