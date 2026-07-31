import type { AssetHandle } from "../assets/AssetHandle";
import { MaterialLoader } from "../assets/loaders/MaterialLoader";
import { ShaderLoader } from "../assets/loaders/ShaderLoader";
import { Framebuffer } from "../graphics/gpu/framebuffer/FrameBuffer";
import { ShaderProgram } from "../graphics/gpu/shader/ShaderProgram";
import { Vec2Uniform } from "../graphics/gpu/uniform/Uniform";
import { FramebufferTextureBinding } from "../graphics/material/FramebufferTextureBinding";
import { Material } from "../graphics/material/Material";
import type { RenderContext } from "../graphics/renderer/RenderContext";
import { RenderPass } from "../graphics/renderer/RenderPass";

export class MandelbrotPass extends RenderPass {
    private shader?: AssetHandle<ShaderProgram>;
    private material?: AssetHandle<Material>;
    private framebuffer?: AssetHandle<Framebuffer>;

    public override async initialize(
        ctx: RenderContext
    ): Promise<void> {
        const manager = ctx.manager;

        this.shader = await manager.load<ShaderProgram>(
            'mandelbrot',
            new ShaderLoader(
                ctx.graphics,
                '/src/common/shaders/fullscreen.vert',
                '/src/common/shaders/mandelbrot.frag',
            ),
        );

        this.material = await manager.load<Material>(
            'mandelbrot_material',
            new MaterialLoader(
                '/src/common/materials/mandelbrot.json'
            ),
        );

        this.framebuffer = manager.get<Framebuffer>('dream_buffer');
        
        if(this.framebuffer) {
            this.material.value.setTexture(
                new FramebufferTextureBinding(
                    'uDream',
                    this.framebuffer,
                )
            );
        }
        
        const viewport = ctx.graphics.getViewport();
        this.uniforms.set(
            'uResolution',
            new Vec2Uniform(
                'uResolution',
                [viewport.width, viewport.height],
            ),
        );

        this.material.value.setShader(this.shader);
    }

    public override render(ctx: RenderContext): void {
        if(!this.shader || !this.material) return;

        this.material.value.apply();
        const viewport = ctx.graphics.getViewport();
        const uResolution = this.uniforms.get('uResolution');
        if(uResolution) {
            uResolution.set([viewport.width, viewport.height]);
            uResolution.upload(
                this.shader.value
            );
        }

        ctx.graphics.drawFullScreen();
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