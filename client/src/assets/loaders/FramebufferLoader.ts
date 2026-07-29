import { Framebuffer } from "../../graphics/gpu/framebuffer/FrameBuffer";
import type { GraphicsDevice } from "../../graphics/gpu/GraphicsDevice";
import { AssetLoader } from "../AssetLoader";

export class FramebufferLoader extends AssetLoader<Framebuffer> {
    constructor(
        private readonly graphics: GraphicsDevice,
        private width: number,
        private height: number,
    ) {
        super();
    }

    public async load(): Promise<Framebuffer> {
        return new Framebuffer(
            this.graphics.getContext(),
            this.width,
            this.height,
        );
    }
}