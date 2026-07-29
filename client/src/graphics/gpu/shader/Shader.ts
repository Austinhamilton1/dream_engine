import { Logger } from "../../../core/Logger";
import type { GPUResource } from "../GPUResource";
import type { GraphicsDevice } from "../GraphicsDevice";
import { ShaderType } from "./ShaderType";

export class Shader implements GPUResource {
    private shader: WebGLShader;

    constructor(
        private graphics: GraphicsDevice,
        private type: ShaderType,
        private source: string,
    ) {
        const gl = graphics.getContext();

        const shaderType = 
            type === ShaderType.Vertex
                ? gl.VERTEX_SHADER
                : gl.FRAGMENT_SHADER;

        const shader = gl.createShader(shaderType);

        if(!shader) {
            Logger.error('Could not create shader');
            throw new Error('Unable to create shader.');
        }

        this.shader = shader;

        this.compile();
    }

    private compile(): void {
        const gl = this.graphics.getContext();

        gl.shaderSource(
            this.shader,
            this.source,
        );

        gl.compileShader(
            this.shader
        );

        const success = gl.getShaderParameter(
            this.shader,
            gl.COMPILE_STATUS,
        );

        if(!success) {
            const log = gl.getShaderInfoLog(
                this.shader
            );

            gl.deleteShader(
                this.shader
            );

            if(log) {
                Logger.error('%s\n\n--------------\n\n%s', log, this.numberedSource());
            }

            throw new Error('Shader compilation failed.');
        }

        Logger.info('Shader compiled');
    }

    private numberedSource(): string {
        return this.source
            .split('\n')
            .map(
                (line, index) =>
                    `${index + 1}: ${line}`
            )
            .join('\n');
    }

    public getHandle(): WebGLShader {
        return this.shader;
    }

    public destroy(): void {
        this.graphics
            .getContext()
            .deleteShader(
                this.shader
            );
    }
}