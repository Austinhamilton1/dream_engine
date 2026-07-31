import { PingPongTextureBinding } from "../graphics/material/PingPongTextureBinding";
import type { RenderContext } from "../graphics/renderer/RenderContext";
import { ShaderPass } from "../graphics/renderer/ShaderPass";

export class MandelbrotPass extends ShaderPass {
    protected readonly descriptor = {
        shaderName: 'mandelbrot',
        vertex: '/src/common/shaders/fullscreen.vert',
        fragment: '/src/common/shaders/mandelbrot.frag',
        materialName: 'mandelbrot_material',
        materialPath: '/src/common/materials/mandelbrot.json',
    };

    protected override async initializeMaterial(ctx: RenderContext): Promise<void> {
        this.material.value.setTexture(
            new PingPongTextureBinding(
                'uInput',
                ctx.target,
            ),
        );
    }

    protected override beforeRender(ctx: RenderContext): void {}
}