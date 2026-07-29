import { MaterialLoader } from "../../../assets/loaders/MaterialLoader";
import { ShaderLoader } from "../../../assets/loaders/ShaderLoader";
import { Framebuffer } from "../../gpu/framebuffer/FrameBuffer";
import { ShaderProgram } from "../../gpu/shader/ShaderProgram";
import { Vec2Uniform } from "../../gpu/uniform/Uniform";
import { Material } from "../../material/Material";
import type { RenderContext } from "../RenderContext";
import { RenderPass } from "./RenderPass";

export class MandelbrotPass extends RenderPass {
    public override async initialize(
        ctx: RenderContext
    ): Promise<void> {
        const manager = ctx.manager;

        const program = await manager.load<ShaderProgram>(
            'mandelbrot',
            new ShaderLoader(
                ctx.graphics,
                '/src/common/shaders/fullscreen.vert',
                '/src/common/shaders/mandelbrot.frag',
            ),
        );

        const material = await manager.load<Material>(
            'mandelbrot_material',
            new MaterialLoader(
                '/src/common/materials/mandelbrot.json'
            ),
        );

        const buffer = manager.get<Framebuffer>('dream_buffer');
        if(buffer) {
            material.setTexture(
                'uDream',
                buffer.getTexture(),
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

        material.setShader(program);
    }

    public override render(ctx: RenderContext): void {
        const material = ctx.manager.get<Material>('mandelbrot_material');
        if(!material) return;

        material.apply();
        const viewport = ctx.graphics.getViewport();
        const uResolution = this.uniforms.get('uResolution');
        if(uResolution) {
            uResolution.set([viewport.width, viewport.height]);
            uResolution.upload(material.getShader());
        }

        ctx.graphics.drawFullScreen();
    }

    public override dispose(): void {}
}