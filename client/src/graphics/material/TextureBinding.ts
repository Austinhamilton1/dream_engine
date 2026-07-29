import type { Texture } from "../gpu/texture/Texture";

export class TextureBinding {
    constructor(
        public readonly name: string,
        public readonly texture: Texture,
    ) {}
}