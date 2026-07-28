import { MeshLoader } from "../../../assets/loaders/MeshLoader";
import { ShaderLoader } from "../../../assets/loaders/ShaderLoader";
import { Timer } from "../../../core/Timer";
import { VertexLayout } from "../../gpu/layout/VertexLayout";
import { Mesh } from "../../gpu/mesh/Mesh";
import { ShaderProgram } from "../../gpu/shader/ShaderProgram";
import { FloatUniform } from "../../gpu/uniform/FloatUniform";
import type { Uniform } from "../../gpu/uniform/Uniform";
import { Vec2Uniform } from "../../gpu/uniform/VectorUniform";
import type { RenderContext } from "../RenderContext";
import { RenderPass } from "./RenderPass";

export class DreamPass extends RenderPass {
    private uniforms = new Map<string, Uniform<any>>();

    public override async initialize(
        ctx: RenderContext
    ): Promise<void> {
        const manager = ctx.manager;

        await manager.load<ShaderProgram>(
            'dream',
            new ShaderLoader(
                ctx.graphics,
                '/src/common/shaders/triangle.vert',
                '/src/common/shaders/dream_field.frag',
            ),
        );

        await manager.load<Mesh>(
            'triangle',
            new MeshLoader(
                ctx.graphics,
                '/src/common/meshes/triangle.json',
            ),
        );

        this.uniforms.set('uTime', new FloatUniform('uTime', 0));

        const viewport = ctx.graphics.getViewport();
        this.uniforms.set('uResolution', new Vec2Uniform('uResolution', [viewport.width, viewport.height]));
    }

    public override render(ctx: RenderContext): void {
        const program = ctx.manager.get<ShaderProgram>('dream');
        if(!program) return;

        const triangleMesh = ctx.manager.get<Mesh>('triangle');
        if(!triangleMesh) return;

        program.use();

        const uTime = this.uniforms.get('uTime');
        if(uTime) {
            uTime.set(Timer.elapsedTime);
            uTime.upload(program);
        }

        const viewport = ctx.graphics.getViewport();
        const uResolution = this.uniforms.get('uResolution');
        if(uResolution) {
            uResolution.set([viewport.width, viewport.height]);
            uResolution.upload(program);
        }

        triangleMesh.bind();
        triangleMesh.draw();
    }

    public override dispose(): void {}
}