export enum EngineEvent {
    WindowResize = 'window.resize',
    EngineStart = 'engine.start',
    EngineStop = 'engine.stop',
    EngineStep = 'engine.step',
}

export interface WindowResizeEvent {
    width: number;
    height: number;
}

export interface EngineStartEvent {
    source: string;
}

export interface EngineStopEvent {
    source: string;
}

export interface EngineStepEvent {
    source: string;
}

export interface EngineEventMap {
    [EngineEvent.WindowResize]: WindowResizeEvent;
    [EngineEvent.EngineStart]: EngineStartEvent;
    [EngineEvent.EngineStop]: EngineStopEvent;
    [EngineEvent.EngineStep]: EngineStepEvent;
}