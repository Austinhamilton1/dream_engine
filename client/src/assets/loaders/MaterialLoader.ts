import type { ShaderProgram } from "../../graphics/gpu/shader/ShaderProgram";
import { Material } from "../../graphics/material/Material";
import { AssetLoader } from "../AssetLoader";

export class MaterialLoader extends AssetLoader<Material> {
    constructor(
        private program: ShaderProgram,
    ) {
        super();
    }

    public async load(): Promise<Material> {
        return new Material(this.program);
    }
}