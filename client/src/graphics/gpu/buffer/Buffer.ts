import { Logger } from "../../../core/Logger";
import type { GPUResource } from "../GPUResource";

export abstract class Buffer implements GPUResource {
    protected readonly gl: WebGL2RenderingContext;
    protected readonly target: GLenum;

    private buffer: WebGLBuffer | null;

    protected constructor(
        gl: WebGL2RenderingContext,
        target: GLenum,
    ) {
        this.gl = gl;
        this.target = target;

        const buffer = gl.createBuffer();
        if(!buffer) {
            Logger.error('Failed to create buffer');
            throw new Error('Invalid buffer');
        }

        this.buffer = buffer;
    }

    public bind(): void {
        this.gl.bindBuffer(this.target, this.getBuffer());
    }

    public unbind(): void {
        this.gl.bindBuffer(this.target, null);
    }

    protected getBuffer(): WebGLBuffer {
        if(!this.buffer) {
            Logger.error('Buffer has been destroyed');
            throw new Error('Invalid buffer');
        }

        return this.buffer;
    }

    public destroy(): void {
        if(this.buffer) {
            this.gl.deleteBuffer(this.buffer);
            this.buffer = null;
        }
    }
}