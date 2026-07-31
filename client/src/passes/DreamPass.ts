import { Timer } from "../core/Timer";
import type { RenderContext } from "../graphics/renderer/RenderContext";
import { ShaderPass } from "../graphics/renderer/ShaderPass";

export class DreamPass extends ShaderPass {
    protected readonly descriptor = {
        shaderName: 'dream',
        vertex: '/src/common/shaders/fullscreen.vert',
        fragment: '/src/common/shaders/dream_field.frag',
        materialName: 'dream_material',
        materialPath: '/src/common/materials/dream.json',
    };

    protected override beforeRender(ctx: RenderContext): void {
        this.material.value.setUniform(
            'uTime',
            Timer.elapsedTime,
        );
    }
}