import type { AssetHandle } from "../assets/AssetHandle";
import { MaterialLoader } from "../assets/loaders/MaterialLoader";
import { ShaderLoader } from "../assets/loaders/ShaderLoader";
import { Timer } from "../core/Timer";
import { ShaderProgram } from "../graphics/gpu/shader/ShaderProgram";
import { FloatUniform, Vec2Uniform } from "../graphics/gpu/uniform/Uniform";
import { Material } from "../graphics/material/Material";
import { PostProcessPass } from "../graphics/renderer/PostProcessPass";
import type { RenderContext } from "../graphics/renderer/RenderContext";

export class DreamPass extends PostProcessPass {
    protected material!: AssetHandle<Material>;
    private shader?: AssetHandle<ShaderProgram>;

    public override async initialize(ctx: RenderContext): Promise<void> {
        const manager = ctx.manager;

        this.shader = await manager.load<ShaderProgram> (
            'dream',
            new ShaderLoader(
                ctx.graphics,
                '/src/common/shaders/fullscreen.vert',
                '/src/common/shaders/dream_field.frag',
            ),
        );

        this.material = await manager.load<Material>(
            'dream_material',
            new MaterialLoader(null),
        )

        this.material.value.setShader(this.shader);

        this.uniforms.set(
            'uTime',
            new FloatUniform(
                'uTime',
                0,
            )
        );

        this.uniforms.set(
            'uResolution',
            new Vec2Uniform(
                'uResolution',
                [
                    ctx.width,
                    ctx.height,
                ],
            ),
        );
    }

    protected override beforeRender(ctx: RenderContext): void {
        const shader = this.shader?.value;
        if(!shader) return;

        const uTime = this.uniforms.get('uTime');
        if(uTime) {
            uTime.set(Timer.elapsedTime);
            uTime.upload(shader);
        }

        const uResolution = this.uniforms.get('uResolution');
        if(uResolution) {
            uResolution.set([
                ctx.width,
                ctx.height,
            ]);
            uResolution.upload(shader);
        }
    }

    public override resize(ctx: RenderContext): void {
        const uResolution = this.uniforms.get('uResolution');
        if(uResolution) {
            uResolution.set([
                ctx.width,
                ctx.height,
            ]);
        }
    }

    public override dispose(): void {
        this.material?.dispose();
        this.shader?.dispose();

        this.shader = undefined;
        this.material = undefined!;
    }
}