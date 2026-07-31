import { PingPongTextureBinding } from "../material/PingPongTextureBinding";
import type { RenderContext } from "./RenderContext";
import { ShaderPass, type ShaderPassDescriptor } from "./ShaderPass";

export class PresentPass extends ShaderPass {
    protected readonly descriptor: ShaderPassDescriptor = {
        shaderName: 'present',
        vertex: '/src/common/shaders/fullscreen.vert',
        fragment: '/src/common/shaders/present.frag',
        materialName: 'present_material',
        materialPath: null,
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

    public override render(ctx: RenderContext): void {
        ctx.bindDefaultFramebuffer();
        this.material.value.apply();
        ctx.graphics.drawFullScreen();
    }
}