import type { AssetHandle } from "../assets/AssetHandle";
import { FramebufferLoader } from "../assets/loaders/FramebufferLoader";
import { MaterialLoader } from "../assets/loaders/MaterialLoader";
import { ShaderLoader } from "../assets/loaders/ShaderLoader";
import { Timer } from "../core/Timer";
import { Framebuffer } from "../graphics/gpu/framebuffer/FrameBuffer";
import { ShaderProgram } from "../graphics/gpu/shader/ShaderProgram";
import { FloatUniform, Vec2Uniform } from "../graphics/gpu/uniform/Uniform";
import { Material } from "../graphics/material/Material";
import type { RenderContext } from "../graphics/renderer/RenderContext";
import { RenderPass } from "../graphics/renderer/RenderPass";

export class DreamPass extends RenderPass {
    private framebuffer?: AssetHandle<Framebuffer>;
    private material?: AssetHandle<Material>;
    private shader?: AssetHandle<ShaderProgram>;

    public override async initialize(
        ctx: RenderContext
    ): Promise<void> {
        const manager = ctx.manager;
        const viewport = ctx.graphics.getViewport();

        this.shader = await manager.load<ShaderProgram>(
            'dream',
            new ShaderLoader(
                ctx.graphics,
                '/src/common/shaders/fullscreen.vert',
                '/src/common/shaders/dream_field.frag',
            ),
        );

        this.framebuffer = await manager.load<Framebuffer>(
            'dream_buffer',
            new FramebufferLoader(
                ctx.graphics,
                viewport.width,
                viewport.height,
            ),
        );
        
        this.material = await manager.load<Material>(
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

        this.material.value.setShader(
            this.shader,
        );
    }

    public override render(ctx: RenderContext): void {
        if( !this.shader || !this.framebuffer || !this.material)
            return;

        this.framebuffer.value.bind();
        this.material.value.apply();

        const uTime = this.uniforms.get('uTime');
        if(uTime) {
            uTime.set(Timer.elapsedTime);
            uTime.upload(this.shader.value);
        }

        const viewport = ctx.graphics.getViewport();
        const uResolution = this.uniforms.get('uResolution');
        if(uResolution) {
            uResolution.set([viewport.width, viewport.height]);
            uResolution.upload(this.shader.value);
        }

        ctx.graphics.drawFullScreen();
        this.framebuffer.value.unbind();
    }

    public override dispose(): void {
        this.shader?.dispose();
        this.material?.dispose();
        this.framebuffer?.dispose();

        this.shader = undefined;
        this.material = undefined;
        this.framebuffer = undefined;
    }
}