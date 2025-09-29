type Logger = {
    info: (message: string, ...args: any[]) => void;
    error: (message: string, ...args: any[]) => void;
    debug: (message: string, ...args: any[]) => void;
}

const logInfo = (message, ...args) => {
    console.info(`[INFO]: ${message}`, ...args);
};

const logError = (message, ...args) => {
    console.error(`[ERROR]: ${message} Details:`, ...args);
};

const logDebug = (message, ...args) => {
    console.debug(`[DEBUG]: ${message}`, ...args);
};

export const logger: Logger = {info: logInfo, error: logError, debug: logDebug};