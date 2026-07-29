import { Logger } from "../../../core/Logger";
import type { GPUResource } from "../GPUResource";
import type { GraphicsDevice } from "../GraphicsDevice";
import type { Shader } from "./Shader";

export class ShaderProgram implements GPUResource {
    private readonly graphics: GraphicsDevice;
    private readonly program: WebGLProgram;
    private uniforms = new Map<string, WebGLUniformLocation>();

    constructor(
        graphics: GraphicsDevice,
        vertex: Shader,
        fragment: Shader,
    ) {
        this.graphics = graphics;

        const gl = graphics.getContext();
        
        const program = gl.createProgram();
        if(!program) {
            Logger.error('Failed to create shader program.');
            throw new Error('Shader program failed');
        }

        this.program = program;

        gl.attachShader(
            this.program,
            vertex.getHandle(),
        );

        gl.attachShader(
            this.program,
            fragment.getHandle(),
        );

        this.link();

        gl.validateProgram(this.program);
        const valid = gl.getProgramParameter(
            this.program,
            gl.VALIDATE_STATUS,
        );

        if(!valid) {
            const log = gl.getProgramInfoLog(this.program);

            Logger.warn("Program validation failed:\n%s\n", log);
        }
    }

    private link(): void {
        const gl = this.graphics.getContext();

        gl.linkProgram(this.program);

        const success = gl.getProgramParameter(
            this.program,
            gl.LINK_STATUS,
        );

        if(!success) {
            const log = gl.getProgramInfoLog(this.program);

            gl.deleteProgram(this.program);

            Logger.error("%s\n", log);

            throw new Error('Shader program failed to link.');
        }

        Logger.info('Shader program linked.');
    }

    public use(): void {
        this.graphics
            .getContext()
            .useProgram(
                this.program
            );
    }

    public destroy(): void {
        this.graphics
            .getContext()
            .deleteProgram(
                this.program
            );
    }

    public getHandle(): WebGLProgram {
        return this.program;
    }

    private getUniformLocation(name: string): WebGLUniformLocation {
        const cached = this.uniforms.get(name);
        if(cached) return cached;

        const location = 
            this.graphics
                .getContext()
                .getUniformLocation(
                    this.program,
                    name,
                );

        if(!location) {
            Logger.error('Uniform "%s" not found', name);
            throw new Error('Invalid uniform');
        }

        this.uniforms.set(
            name,
            location,
        );

        return location;
    }

    public setFloat(name: string, value: number) {
        const gl = this.graphics.getContext();
        const uniform = this.getUniformLocation(name);

        gl.uniform1f(uniform, value);
    }

    public setInt(name: string, value: number) {
        const gl = this.graphics.getContext();
        const uniform = this.getUniformLocation(name);

        gl.uniform1i(uniform, value);
    }

    public setVector2(name: string, x: number, y: number) {
        const gl = this.graphics.getContext();
        const uniform = this.getUniformLocation(name);

        gl.uniform2f(uniform, x, y);
    }

    public setVector3(name: string, x: number, y: number, z: number) {
        const gl = this.graphics.getContext();
        const uniform = this.getUniformLocation(name);

        gl.uniform3f(uniform, x, y, z);
    }
}