import { Logger } from "../../../core/Logger";
import type { GPUResource } from "../GPUResource";

export class Framebuffer implements GPUResource {
    private readonly gl: WebGL2RenderingContext;
    private framebuffer: WebGLFramebuffer | null;

    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;

        const fb = gl.createFramebuffer();
        if(!fb) {
            Logger.error('Failed to create framebuffer');
            throw new Error('Invalid framebuffer');
        }

        this.framebuffer = fb;
    }

    public bind(): void {
        this.gl.bindFramebuffer(
            this.gl.FRAMEBUFFER,
            this.framebuffer,
        );
    }

    public unbind(): void {
        this.gl.bindFramebuffer(
            this.gl.FRAMEBUFFER,
            null,
        );
    }

    public getHandle(): WebGLFramebuffer {
        if(!this.framebuffer) {
            Logger.error('Framebuffer destroyed');
            throw new Error('Invalid framebuffer');
        }

        return this.framebuffer;
    }

    public destroy(): void {
        if(this.framebuffer) {
            this.gl.deleteFramebuffer(this.framebuffer);
            this.framebuffer = null;
        }
    }
}