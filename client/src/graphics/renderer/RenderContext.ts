import type { AssetManager } from "../../assets/AssetManager";
import type { Disposable } from "../Disposable";
import type { PingPongFramebuffer } from "../gpu/framebuffer/PingPongFramebuffer";
import type { GraphicsDevice } from "../gpu/GraphicsDevice";

export class RenderContext implements Disposable {
    public readonly graphics: GraphicsDevice;
    public readonly manager: AssetManager;
    public readonly target: PingPongFramebuffer;

    public width: number;
    public height: number;

    private readonly gl: WebGL2RenderingContext;

    constructor(
        graphics: GraphicsDevice,
        manager: AssetManager,
        target: PingPongFramebuffer,
        width: number,
        height: number,
    ) {
        this.graphics = graphics;
        this.manager = manager;
        this.target = target;
        this.width = width;
        this.height = height;

        this.gl = graphics.getContext();
    }

    public bindWriteTarget(): void {
        this.target.write().bind();
        this.gl.viewport(0, 0, this.width, this.height);
    }

    public bindReadTarget(): void {
        this.target.read().bind();
        this.gl.viewport(0, 0, this.width, this.height);
    }

    public bindDefaultFramebuffer(): void {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        this.gl.viewport(0, 0, this.width, this.height);
    }

    public swapTargets(): void {
        this.target.swap();
    }

    public resize(width: number, height: number): void {
        this.width = width;
        this.height = height;

        this.target.resize(width, height);
    }

    public dispose(): void {
        this.target.dispose();
    }
}