import {IAppender} from "./IAppender";
import LoggerConfig from "./LoggerConfig";
import {LogLevel} from "./LogLevel";
import {stringify} from "./Utils";

export default class Logger {
    constructor(private tag?: string) {

    }
    public log(message: string, ...params: any[]) {
        this.doLog(LogLevel.INFO, message, ...params);
    }
    public info(message: string, ...params: any[]) {
        this.doLog(LogLevel.INFO, message, ...params);
    }
    public fatal(message: string, ...params: any[]) {
        this.doLog(LogLevel.FATAL, message, ...params);
    }
    public error(message: string, ...params: any[]) {
        this.doLog(LogLevel.ERROR, message, ...params);
    }
    public debug(message: string, ...params: any[]) {
        this.doLog(LogLevel.DEBUG, message, ...params);
    }
    public warn(message: string, ...params: any[]) {
        this.doLog(LogLevel.WARN, message, ...params);
    }
    public trace(message: string, ...params: any[]) {
        this.doLog(LogLevel.TRACE, message, ...params);
    }

    public static setConfig(config: LoggerConfig) {
        Logger.config = config;
    }

    public static getLogger(tag?: string) {
        if (!tag) {
            return Logger.getLogger('undefined');
        }
        if (Logger.loggers[tag]) {
            return Logger.loggers[tag];
        } else {
            return Logger.loggers[tag] = new Logger(tag);
        }
    }

    private static loggers: {[tag: string]: Logger} = {};

    private doLog(level: LogLevel, message: string, ...params: any[]) {
        if (level >= Logger.config.getLevel() && Logger.config.hasTag(this.tag)) {
            if (params != null && params.length > 0) {
                message = message.replace(/{(\d+)}/g, (match, number) => params[number] ? params[number] : match);
            }

            for (var i in Logger.config.getAppenders()) {
                var appender = Logger.config.getAppenders()[i];
                appender.append({
                    message: message,
                    time: new Date(),
                    tag: this.tag,
                    level: level
                });
            }
        }
    }

    private static config: LoggerConfig = new LoggerConfig();
}
