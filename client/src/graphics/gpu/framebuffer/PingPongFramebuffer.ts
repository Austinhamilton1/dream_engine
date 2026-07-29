import type { GPUResource } from "../GPUResource";
import { Framebuffer } from "./FrameBuffer";

export class PingPongFramebuffer implements GPUResource {
    private front: Framebuffer;
    private back: Framebuffer;

    constructor(
        gl: WebGL2RenderingContext,
        width: number,
        height: number,
    ) {
        this.front = new Framebuffer(gl, width, height);
        this.back = new Framebuffer(gl, width, height);
    }

    public getRead(): Framebuffer {
        return this.front;
    }

    public getWrite(): Framebuffer {
        return this.back;
    }

    public swap(): void {
        [this.front, this.back] = [this.back, this.front];
    }

    public destroy(): void {
        this.front.destroy();
        this.back.destroy();
    }
}