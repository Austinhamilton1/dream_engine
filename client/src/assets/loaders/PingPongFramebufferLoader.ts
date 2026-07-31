import { PingPongFramebuffer } from "../../graphics/gpu/framebuffer/PingPongFramebuffer";
import type { GraphicsDevice } from "../../graphics/gpu/GraphicsDevice";
import { AssetLoader } from "../AssetLoader";

export class PingPongFramebufferLoader extends AssetLoader<PingPongFramebuffer> {
    constructor(
        private readonly graphics: GraphicsDevice,
        private width: number,
        private height: number,
    ) {
        super();
    }

    public async load(): Promise<PingPongFramebuffer> {
        return new PingPongFramebuffer(
            this.graphics.getContext(),
            this.width,
            this.height,
        );
    }
}