import pino from 'pino';

const isServer = typeof window === 'undefined';
const serviceName = 'cropfresh-web-marketing';
const logLevel = process.env.LOG_LEVEL || 'info';
const env = process.env.NODE_ENV || 'development';

export const logger = pino({
    level: logLevel,
    browser: {
        asObject: true,
    },
    redact: {
        paths: ['password', 'token', 'authorization'],
        remove: true,
    },
    transport: (isServer && env === 'development') ? {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
        },
    } : undefined,
    base: isServer ? {
        pid: process.pid,
        hostname: require('os').hostname(),
        service: serviceName,
        env: env,
    } : {
        service: serviceName,
        env: env,
    },
    timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;
