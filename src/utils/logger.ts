import pino from 'pino';

const isServer = typeof window === 'undefined';

export const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: isServer && process.env.NODE_ENV !== 'production'
        ? {
            target: 'pino-pretty',
            options: {
                colorize: true,
                ignore: 'pid,hostname',
            },
        }
        : undefined,
    base: {
        service: 'cropfresh-web-marketing',
        env: process.env.NODE_ENV || 'development',
    },
    browser: {
        asObject: true,
    },
});
