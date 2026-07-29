import { Logger } from "../../core/Logger";
import { FloatUniform, IntUniform, Uniform, Vec2Uniform, Vec3Uniform } from "../../graphics/gpu/uniform/Uniform";
import { Material } from "../../graphics/material/Material";
import { AssetLoader } from "../AssetLoader";

export class MaterialLoader extends AssetLoader<Material> {
    constructor(
        private readonly uniformFile: string | null,
    ) {
        super();
    }

    private async fetchUniforms(
        sourceFile: string
    ): Promise<Uniform<any>[]> {
        const uniforms: Uniform<any>[] = [];

        const response = await fetch(sourceFile);
        if(!response.ok) {
            Logger.error('Invalid material source: "%s"', sourceFile);
            throw new Error('Invalid path');
        }

        const json = await response.json();

        const uniformData = json.uniforms;
        for(const uniform of uniformData) {
            const name = uniform.name;
            const type = uniform.type;
            const value = uniform.value;

            switch(type) {
            case 'float':
                uniforms.push(new FloatUniform(
                    name,
                    value,
                ));
                break;
            case 'int':
                uniforms.push(new IntUniform(
                    name,
                    value,
                ));
                break;
            case 'vec2':
                uniforms.push(new Vec2Uniform(
                    name, 
                    value,
                ));
                break;
            case 'vec3': 
                uniforms.push(new Vec3Uniform(
                    name,
                    value,
                ));
                break;
            }
        }

        return uniforms;
    }

    public async load(): Promise<Material> {
        const material = new Material();
        
        if(this.uniformFile) {
            const uniforms = await this.fetchUniforms(
                this.uniformFile
            );

            for(const uniform of uniforms) {
                material.addUniform(
                    uniform,
                );
            }
        }

        return material;
    }
}