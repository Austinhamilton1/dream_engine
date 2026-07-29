import { FramebufferLoader } from "../../../assets/loaders/FramebufferLoader";
import { MaterialLoader } from "../../../assets/loaders/MaterialLoader";
import { ShaderLoader } from "../../../assets/loaders/ShaderLoader";
import { Timer } from "../../../core/Timer";
import { Framebuffer } from "../../gpu/framebuffer/FrameBuffer";
import { ShaderProgram } from "../../gpu/shader/ShaderProgram";
import { FloatUniform, Vec2Uniform } from "../../gpu/uniform/Uniform";
import { Material } from "../../material/Material";
import type { RenderContext } from "../RenderContext";
import { RenderPass } from "./RenderPass";

export class DreamPass extends RenderPass {
    public override async initialize(
        ctx: RenderContext
    ): Promise<void> {
        const manager = ctx.manager;
        const viewport = ctx.graphics.getViewport();

        const program = await manager.load<ShaderProgram>(
            'dream',
            new ShaderLoader(
                ctx.graphics,
                '/src/common/shaders/fullscreen.vert',
                '/src/common/shaders/dream_field.frag',
            ),
        );

        await manager.load<Framebuffer>(
            'dream_buffer',
            new FramebufferLoader(
                ctx.graphics,
                viewport.width,
                viewport.height,
            ),
        );
        
        const material = await manager.load<Material>(
            'dream_material',
            new MaterialLoader(null),
        )

        this.uniforms.set(
            'uTime',
            new FloatUniform('uTime', 0),
        );

        this.uniforms.set(
            'uResolution',
            new Vec2Uniform(
                'uResolution',
                [viewport.width, viewport.height],
            ),
        );

        material.setShader(program);
    }

    public override render(ctx: RenderContext): void {
        const target = ctx.manager.get<Framebuffer>('dream_buffer');
        if(!target) return;

        const material = ctx.manager.get<Material>('dream_material');
        if(!material) return;

        target.bind();
        material.apply();

        const uTime = this.uniforms.get('uTime');
        if(uTime) {
            uTime.set(Timer.elapsedTime);
            uTime.upload(material.getShader());
        }

        const viewport = ctx.graphics.getViewport();
        const uResolution = this.uniforms.get('uResolution');
        if(uResolution) {
            uResolution.set([viewport.width, viewport.height]);
            uResolution.upload(material.getShader());
        }

        ctx.graphics.drawFullScreen();
        target.unbind();
    }

    public override dispose(): void {}
}