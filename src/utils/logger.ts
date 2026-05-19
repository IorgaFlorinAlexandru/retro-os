type Logger = {
    info: (message: string, ...args: any[]) => void;
    error: (message: string, ...args: any[]) => void;
    debug: (message: string, ...args: any[]) => void;
}

const logInfo = (message: string, ...args: any[]) => {
    console.info(`[INFO]: ${message}`, ...args);
};

const logError = (message: string, ...args: any[]) => {
    console.error(`[ERROR]: ${message}${args.length !== 0 ? ' Details: ' : '.'}`, ...args);
};

const logDebug = (message: string, ...args: any[]) => {
    console.debug(`[DEBUG]: ${message}`, ...args);
};

export const logger: Logger = {info: logInfo, error: logError, debug: logDebug};