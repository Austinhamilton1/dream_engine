export enum EngineEvent {
    WindowResize = 'window.resize',
}

export interface WindowResizeEvent {
    width: number;
    height: number;
}

export interface EngineEventMap {
    [EngineEvent.WindowResize]: WindowResizeEvent;
}