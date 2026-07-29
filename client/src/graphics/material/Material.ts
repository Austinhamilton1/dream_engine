import type { ShaderProgram } from "../gpu/shader/ShaderProgram";
import type { Texture } from "../gpu/texture/Texture";
import type { Uniform } from "../gpu/uniform/Uniform";
import { RenderState } from "./RenderState";
import { TextureBinding } from "./TextureBinding";

export class Material {
    private readonly uniforms = new Map<string, Uniform<any>>();
    private readonly textures = new Map<string, TextureBinding>();
    public readonly state = new RenderState();

    constructor(
        private readonly shader: ShaderProgram,
    ) {}

    public getShader(): ShaderProgram {
        return this.shader;
    }

    public addUniform(uniform: Uniform<any>): void {
        this.uniforms.set(
            uniform.name,
            uniform,
        );
    }

    public setTexture(
        name: string,
        texture: Texture,
    ): void {
        this.textures.set(
            name,
            new TextureBinding(
                name,
                texture,
            ),
        );
    }

    public apply(): void {
        this.shader.use();

        // Upload textures
        let unit = 0;
        for(const texture of this.textures.values()) {
            texture.texture.bind(unit);

            this.shader.setInt(
                texture.name,
                unit,
            );

            unit++;
        }

        // Upload uniforms
        for(const uniform of this.uniforms.values()) {
            uniform.upload(this.shader);
        }
    }
}