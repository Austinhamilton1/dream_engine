import type { AssetHandle } from "../../assets/AssetHandle";
import type { Texture } from "../gpu/texture/Texture";
import type { TextureBinding } from "./TextureBinding";

export class AssetTextureBinding implements TextureBinding {
    constructor(
        public readonly name: string,
        private readonly handle: AssetHandle<Texture>,
    ) {}

    public get texture(): Texture {
        return this.handle.value;
    }

    public dispose(): void {
        this.handle.dispose();
    }
}