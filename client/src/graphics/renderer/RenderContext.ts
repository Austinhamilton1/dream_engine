import type { AssetManager } from "../../assets/AssetManager";
import type { GraphicsDevice } from "../gpu/GraphicsDevice";

export interface RenderContext {
    graphics: GraphicsDevice;
    manager: AssetManager;
    width: number;
    height: number;
}