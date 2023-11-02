module.exports = {
    apps: [
        {
            name: 'administrador-llaves-backend',
            script: 'serve',
            env: {
                PM2_SERVE_PATH: 'dist',
                PM2_SERVE_PORT: 3000,
                DB_HOST: 'localhost',
                DB_PORT: '5432',
                DB_USERNAME: 'postgres',
                DB_DATABASE: 'keys',
                DB_PASSWORD: '123456',
                DB_SYNC: 'true',
                DB_LOGGING: 'false',
                JWT_SECRET: '',
                JWT_EXPIRES_IN: '15min',
            },
        },
    ],
};
