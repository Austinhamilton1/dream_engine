import type { AssetManager } from "../../assets/AssetManager";
import type { PingPongFramebuffer } from "../gpu/framebuffer/PingPongFramebuffer";
import type { GraphicsDevice } from "../gpu/GraphicsDevice";

export interface RenderContext {
    graphics: GraphicsDevice;
    manager: AssetManager;
    width: number;
    height: number;
    target: PingPongFramebuffer;
}