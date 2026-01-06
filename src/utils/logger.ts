/**
 * Simple client-safe logger for CropFresh Marketing Site
 * Uses console in development, can be extended for production monitoring
 */

const isDevelopment = process.env.NODE_ENV === "development";
const serviceName = "cropfresh-web-marketing";

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogMessage {
    level: LogLevel;
    message: string;
    timestamp: string;
    service: string;
    data?: Record<string, unknown>;
}

function formatLog(
    level: LogLevel,
    message: string,
    data?: Record<string, unknown>
): LogMessage {
    return {
        level,
        message,
        timestamp: new Date().toISOString(),
        service: serviceName,
        data,
    };
}

export const logger = {
    debug: (message: string, data?: Record<string, unknown>) => {
        if (isDevelopment) {
            console.debug(formatLog("debug", message, data));
        }
    },
    info: (message: string, data?: Record<string, unknown>) => {
        console.info(formatLog("info", message, data));
    },
    warn: (message: string, data?: Record<string, unknown>) => {
        console.warn(formatLog("warn", message, data));
    },
    error: (message: string, error?: Error, data?: Record<string, unknown>) => {
        const errorData = error
            ? {
                ...data,
                error: {
                    name: error.name,
                    message: error.message,
                    stack: isDevelopment ? error.stack : undefined,
                },
            }
            : data;
        console.error(formatLog("error", message, errorData));
    },
};

export default logger;
