import type { PingPongFramebuffer } from "../gpu/framebuffer/PingPongFramebuffer";
import type { Texture } from "../gpu/texture/Texture";
import type { TextureBinding } from "./TextureBinding";

export class PingPongTextureBinding implements TextureBinding {
    constructor(
        public readonly name: string,
        private readonly target: PingPongFramebuffer,
    ) {}

    public get texture(): Texture {
        return this.target.read().getTexture();
    }

    public dispose(): void {
        this.target.dispose();
    }
}