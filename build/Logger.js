"use strict";
exports.__esModule = true;
var LoggerConfig_1 = require("./LoggerConfig");
var LogLevel_1 = require("./LogLevel");
var Logger = (function () {
    function Logger(tag) {
        this.tag = tag;
    }
    Logger.prototype.log = function (message) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.doLog.apply(this, [LogLevel_1.LogLevel.INFO, message].concat(params));
    };
    Logger.prototype.info = function (message) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.doLog.apply(this, [LogLevel_1.LogLevel.INFO, message].concat(params));
    };
    Logger.prototype.fatal = function (message) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.doLog.apply(this, [LogLevel_1.LogLevel.FATAL, message].concat(params));
    };
    Logger.prototype.error = function (message) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.doLog.apply(this, [LogLevel_1.LogLevel.ERROR, message].concat(params));
    };
    Logger.prototype.debug = function (message) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.doLog.apply(this, [LogLevel_1.LogLevel.DEBUG, message].concat(params));
    };
    Logger.prototype.warn = function (message) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.doLog.apply(this, [LogLevel_1.LogLevel.WARN, message].concat(params));
    };
    Logger.prototype.trace = function (message) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        this.doLog.apply(this, [LogLevel_1.LogLevel.TRACE, message].concat(params));
    };
    Logger.setConfig = function (config) {
        Logger.config = config;
    };
    Logger.getLogger = function (tag) {
        if (!tag) {
            return Logger.getLogger('undefined');
        }
        if (Logger.loggers[tag]) {
            return Logger.loggers[tag];
        }
        else {
            return Logger.loggers[tag] = new Logger(tag);
        }
    };
    Logger.prototype.doLog = function (level, message) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        if (level >= Logger.config.getLevel() && Logger.config.hasTag(this.tag)) {
            if (params != null && params.length > 0) {
                message = message.replace(/{(\d+)}/g, function (match, number) { return params[number] ? params[number] : match; });
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
    };
    Logger.loggers = {};
    Logger.config = new LoggerConfig_1["default"]();
    return Logger;
}());
exports["default"] = Logger;
