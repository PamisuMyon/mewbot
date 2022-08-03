import EventEmitter from "events";

type EventMap = Record<string, any>;
type EventKey<T extends EventMap> = string & keyof T;
type EventReceiver<T> = (params: T) => void;

export class BaseEmitter<T extends EventMap> {
    protected _emitter = new EventEmitter();
    
    on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>) {
        this._emitter.on(eventName, fn);
    }

    off<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>) {
        this._emitter.off(eventName, fn);
    }

    protected emit<K extends EventKey<T>>(eventName: K, params: T[K]) {
        this._emitter.emit(eventName, params);
    }
}
