import { Logger } from "../../../core/Logger";
import type { Disposable } from "../../Disposable";
import { Texture } from "../texture/Texture";

export class Framebuffer implements Disposable {
    private readonly texture: Texture;
    private readonly framebuffer: WebGLFramebuffer;
    private readonly depth: WebGLRenderbuffer;

    constructor(
        private readonly gl: WebGL2RenderingContext,
        width: number,
        height: number,
    ) {
        this.texture = new Texture(
            gl,
            width,
            height,
        );

        const framebuffer = gl.createFramebuffer();
        if(!framebuffer) {
            Logger.error('Failed to create framebuffer');
            throw new Error('Invalid framebuffer');
        }

        this.framebuffer = framebuffer;

        const depth = gl.createRenderbuffer();
        if(!depth) {
            Logger.error('Failed to create renderbuffer');
            throw new Error('Invalid renderbuffer');
        }

        this.depth = depth;

        // Set up initial parameters
        gl.bindFramebuffer(
            gl.FRAMEBUFFER,
            framebuffer,
        );

        gl.framebufferTexture2D(
            gl.FRAMEBUFFER,
            gl.COLOR_ATTACHMENT0,
            gl.TEXTURE_2D,
            this.texture.getTexture(),
            0,
        );

        gl.bindRenderbuffer(
            gl.RENDERBUFFER,
            depth,
        );

        gl.renderbufferStorage(
            gl.RENDERBUFFER,
            gl.DEPTH_COMPONENT24,
            width,
            height,
        );

        gl.framebufferRenderbuffer(
            gl.FRAMEBUFFER,
            gl.DEPTH_ATTACHMENT,
            gl.RENDERBUFFER,
            depth,
        );

        if(
            gl.checkFramebufferStatus(gl.FRAMEBUFFER) != 
            gl.FRAMEBUFFER_COMPLETE
        ) {
            Logger.error('Framebuffer incomplete');
            throw new Error('Invalid framebuffer');
        }

        gl.bindFramebuffer(
            gl.FRAMEBUFFER,
            null,
        );
    }

    public bind() {
        this.gl.bindFramebuffer(
            this.gl.FRAMEBUFFER,
            this.framebuffer,
        );
    }

    public unbind() {
        this.gl.bindFramebuffer(
            this.gl.FRAMEBUFFER,
            null,
        )
    }

    public getFramebuffer(): WebGLFramebuffer {
        return this.framebuffer;
    }

    public getTexture(): Texture {
        return this.texture;
    }

    public dispose(): void {
        this.texture.dispose();

        this.gl.deleteRenderbuffer(this.depth);

        this.gl.deleteFramebuffer(this.framebuffer);
    }
}