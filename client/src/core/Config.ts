export interface ClearColor {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface EngineConfig {
    width: number;
    height: number;
    title: string;

    clearColor: ClearColor;
}