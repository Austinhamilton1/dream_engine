import { PingPongTextureBinding } from "../graphics/material/PingPongTextureBinding";
import type { RenderContext } from "../graphics/renderer/RenderContext";
import { ShaderPass, type ShaderPassDescriptor } from "../graphics/renderer/ShaderPass";

export class PaintPass extends ShaderPass {
    protected readonly descriptor = {
        shaderName: 'kuwahara',
        vertex: '/src/common/shaders/fullscreen.vert',
        fragment: '/src/common/shaders/kuwahara.frag',
        materialName: 'kuwahara_material',
        materialPath: '/src/common/materials/kuwahara.json',
    };

    protected override async initializeMaterial(ctx: RenderContext): Promise<void> {
        this.material.value.setTexture(
            new PingPongTextureBinding(
                'uInput',
                ctx.target,
            ),
        );
    }

    protected override beforeRender(ctx: RenderContext): void {
        this.material.value.setUniform(
            'uResolution',
            [
                ctx.width,
                ctx.height,
            ],
        );
    }
}