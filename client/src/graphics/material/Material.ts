import type { AssetHandle } from "../../assets/AssetHandle";
import { Logger } from "../../core/Logger";
import type { Disposable } from "../Disposable";
import type { ShaderProgram } from "../gpu/shader/ShaderProgram";
import type { Uniform } from "../gpu/uniform/Uniform";
import { RenderState } from "./RenderState";
import type { TextureBinding } from "./TextureBinding";

export class Material implements Disposable {
    private shader?: AssetHandle<ShaderProgram>;
    private readonly uniforms = new Map<string, Uniform<any>>();
    private readonly textures = new Map<string, TextureBinding>();
    public state = new RenderState();

    constructor() {}

    public setShader(shader: AssetHandle<ShaderProgram>): void {
        this.shader?.dispose();

        this.shader = shader.clone();
    }

    public getShader(): AssetHandle<ShaderProgram> {
        if(!this.shader) {
            Logger.error('Shader not assigned to material');
            throw new Error('Invalid shader');
        }

        return this.shader;
    }

    public addUniform(uniform: Uniform<any>): void {
        this.uniforms.set(
            uniform.name,
            uniform,
        );
    }

    public setTexture(binding: TextureBinding): void {
        this.textures.get(binding.name)?.dispose();

        this.textures.set(
            binding.name,
            binding,
        );
    }

    public apply(): void {
        if(this.shader) {
            this.shader.value.use();

            // Upload textures
            let unit = 0;
            for(const binding of this.textures.values()) {
                binding.texture.bind(unit);

                this.shader.value.setInt(
                    binding.name,
                    unit,
                );

                unit++;
            }

            // Upload uniforms
            for(const uniform of this.uniforms.values()) {
                uniform.upload(this.shader.value);
            }
        }
    }

    public dispose(): void {
        this.shader?.dispose();
        for(const textureBinding of this.textures.values()) {
            textureBinding.dispose();
        }


        this.shader = undefined;
        this.textures.clear();
        this.uniforms.clear();
    }
}