import type { ClearColor } from "../../core/Config";
import { Logger } from "../../core/Logger";
import type { Canvas } from "../Canvas";
import type { Disposable } from "../Disposable";
import { Mesh } from "./mesh/Mesh";
import { createFullscreenTriangle } from "./mesh/primitives/FullscreenTriangle";

interface Viewport {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class GraphicsDevice implements Disposable {
    readonly gl: WebGL2RenderingContext;
    private fullscreenTriangle: Mesh;

    constructor(
        canvas: Canvas,
    ) {
        const gl = canvas.element.getContext('webgl2');

        if(!gl) {
            Logger.error('Could not create GraphicsDevice');
            throw new Error('WebGL2 is not supported by this browser');
        }

        this.gl = gl;

        this.fullscreenTriangle = createFullscreenTriangle(gl);
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

    public drawFullScreen(): void {
        this.fullscreenTriangle.draw();
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

    public dispose(): void {
        this.fullscreenTriangle.dispose();
    }
}