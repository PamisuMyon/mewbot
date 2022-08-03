import { Util } from './utils.js';

export enum LogLevel {
    Verbose = 1,
    Debug = 2,
    Info = 3,
    Warn = 4,
    Error = 5,
    Disabled = 10,
}

export class Logger {
    
    private _logLevel = LogLevel.Error;
    public get logLevel() {
        return this._logLevel;
    }
    public set logLevel(value: LogLevel) {
        this._logLevel = value;
    }

    protected stamp(level = LogLevel.Disabled) {
        let str = Util.dateFormat('[YY-mm-dd HH:MM:SS]', new Date());
        str += `[${LogLevel[level]}] `;
        return str;
    }

    log(msg: any, level = LogLevel.Debug) {
        if (this._logLevel > level)
            return;
        if (level == LogLevel.Error)
            console.error(this.stamp(level) + msg);
        else
            console.log(this.stamp(level) + msg);
    }

    verbose(msg: any) {
        this.log(msg, LogLevel.Verbose);
    }

    debug(msg: any) {
        this.log(msg, LogLevel.Debug);
    }

    info(msg: any){
        this.log(msg, LogLevel.Info);
    }

    warn(msg: any){
        this.log(msg, LogLevel.Warn);
    }

    error(msg: any) {
        this.log(msg, LogLevel.Error);
    }

    dir(obj: any, level = LogLevel.Debug) {
        if (this._logLevel > level)
            return;
        this.log('', level);
        console.dir(obj);
    }

}

// eslint-disable-next-line prefer-const
export let logger = new Logger();

export function setLogger(l: Logger) {
    logger = l;
}