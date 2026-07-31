import type { Disposable } from "../Disposable";
import type { Texture } from "../gpu/texture/Texture";

export interface TextureBinding extends Disposable {
    readonly name: string;
    get texture(): Texture;
}