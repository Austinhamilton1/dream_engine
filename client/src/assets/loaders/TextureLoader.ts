import type { GraphicsDevice } from "../../graphics/gpu/GraphicsDevice";
import { Texture } from "../../graphics/gpu/texture/Texture";
import { AssetLoader } from "../AssetLoader";

export class TextureLoader extends AssetLoader<Texture> {
    constructor(
        private readonly graphics: GraphicsDevice,
        private width: number,
        private height: number,
    ) {
        super();
    }

    public async load(): Promise<Texture> {
        return new Texture(
            this.graphics.getContext(),
            this.width,
            this.height,
        );
    }
}