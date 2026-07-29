import { Logger } from "../../../core/Logger";
import type { GPUResource } from "../GPUResource";

export class Texture implements GPUResource {
    private readonly texture: WebGLTexture;

    constructor(
        private readonly gl: WebGL2RenderingContext,
        width: number,
        height: number,
    ) {
        const texture = gl.createTexture();
        if(!texture) {
            Logger.error('Failed to create texture');
            throw new Error('Invalid texture');
        }

        this.texture = texture;

        // Set up initial texture parameters
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA8,
            width,
            height,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            null,
        );

        gl.texParameteri(
            gl.TEXTURE_2D,
            gl.TEXTURE_MIN_FILTER,
            gl.LINEAR,
        );

        gl.texParameteri(
            gl.TEXTURE_2D,
            gl.TEXTURE_MAG_FILTER,
            gl.LINEAR,
        );

        gl.texParameteri(
            gl.TEXTURE_2D,
            gl.TEXTURE_WRAP_S,
            gl.CLAMP_TO_EDGE,
        );

        gl.texParameteri(
            gl.TEXTURE_2D,
            gl.TEXTURE_WRAP_T,
            gl.CLAMP_TO_EDGE,
        );

        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    public bind(unit = 0): void {
        this.gl.activeTexture(
            this.gl.TEXTURE0 + unit
        );

        this.gl.bindTexture(
            this.gl.TEXTURE_2D,
            this.texture,
        )
    }

    public unbind(): void {
        this.gl.bindTexture(
            this.gl.TEXTURE_2D,
            null,
        );
    }

    public getTexture(): WebGLTexture {
        return this.texture;   
    }

    public destroy(): void {
        this.gl.deleteTexture(this.texture)
    }
}