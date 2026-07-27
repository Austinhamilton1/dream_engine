import type { ClearColor } from "../core/Config";
import { EngineEvent } from "../core/EngineEvents";
import type { EventBus } from "../core/EventBus";
import { Logger } from "../core/Logger";
import type { Canvas } from "./Canvas";

interface Viewport {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class GraphicsDevice {
    readonly gl: WebGL2RenderingContext;

    constructor(
        canvas: Canvas,
        private readonly eventBus: EventBus,
    ) {
        const gl = canvas.element.getContext('webgl2');

        if(!gl) {
            Logger.error('Could not create GraphicsDevice');
            throw new Error('WebGL2 is not supported by this browser');
        }

        this.gl = gl;

        eventBus.on(
            EngineEvent.WindowResize,
            ({ width, height }) => {
                this.resize(width, height);
            }
        )
    }

    public clear(color: ClearColor): void {
        this.gl.clearColor(
            color.r,
            color.g,
            color.b,
            color.a,
        );

        this.gl.clear(
            this.gl.COLOR_BUFFER_BIT |
            this.gl.DEPTH_BUFFER_BIT
        );
    }

    public resize(
        width: number,
        height: number,
    ): void {
        this.gl.viewport(
            0,
            0,
            width,
            height,
        );
    }

    public getContext(): WebGL2RenderingContext  {
        return this.gl;
    }

    public isContextLoss(): boolean {
        return this.gl.isContextLost();
    }

    public getViewport(): Viewport {
        const viewport = this.gl.getParameter(this.gl.VIEWPORT);

        return {
            x: viewport[0],
            y: viewport[1],
            width: viewport[2],
            height: viewport[3],
        };
    }
}