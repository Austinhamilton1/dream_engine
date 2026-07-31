import type { AssetHandle } from "../../assets/AssetHandle";
import type { Framebuffer } from "../gpu/framebuffer/FrameBuffer";
import type { Texture } from "../gpu/texture/Texture";
import type { TextureBinding } from "./TextureBinding";

export class FramebufferTextureBinding implements TextureBinding {
    constructor(
        public readonly name: string,
        private readonly framebuffer: AssetHandle<Framebuffer>
    ) {}

    public get texture(): Texture {
        return this.framebuffer.value.getTexture();
    }

    public dispose(): void {
        this.framebuffer.dispose();
    }
}