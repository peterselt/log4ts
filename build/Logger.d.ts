import LoggerConfig from "./LoggerConfig";
export default class Logger {
    private tag;
    constructor(tag?: string);
    log(message: string, ...params: any[]): void;
    info(message: string, ...params: any[]): void;
    fatal(message: string, ...params: any[]): void;
    error(message: string, ...params: any[]): void;
    debug(message: string, ...params: any[]): void;
    warn(message: string, ...params: any[]): void;
    trace(message: string, ...params: any[]): void;
    static setConfig(config: LoggerConfig): void;
    static getLogger(tag?: string): any;
    private static loggers;
    private doLog(level, message, ...params);
    private static config;
}
