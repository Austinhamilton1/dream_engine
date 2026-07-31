import type { AssetHandle } from "../../assets/AssetHandle";
import { MaterialLoader } from "../../assets/loaders/MaterialLoader";
import { ShaderLoader } from "../../assets/loaders/ShaderLoader";
import type { ShaderProgram } from "../gpu/shader/ShaderProgram";
import type { Material } from "../material/Material";
import type { RenderContext } from "./RenderContext";
import { RenderPass } from "./RenderPass";

export interface ShaderPassDescriptor {
    shaderName: string;
    vertex: string;
    fragment: string;
    materialName: string;
    materialPath: string | null;
}

export abstract class ShaderPass extends RenderPass {
    protected material!: AssetHandle<Material>;
    protected shader!: AssetHandle<ShaderProgram>

    protected abstract readonly descriptor: ShaderPassDescriptor;

    public override async initialize(ctx: RenderContext): Promise<void> {
        this.shader = await ctx.manager.load(
            this.descriptor.shaderName,
            new ShaderLoader(
                ctx.graphics,
                this.descriptor.vertex,
                this.descriptor.fragment,
            ),
        );

        this.material = await ctx.manager.load(
            this.descriptor.materialName,
            new MaterialLoader(
                this.descriptor.materialPath,
            ),
        );

        this.material.value.setShader(this.shader);

        await this.initializeMaterial(ctx);
    }

    protected async initializeMaterial(ctx: RenderContext): Promise<void> {}

    protected beforeRender(ctx: RenderContext): void {}

    public override render(ctx: RenderContext): void {
        ctx.bindWriteTarget();

        ctx.graphics.clear({
            r: 0,
            g: 0,
            b: 0,
            a: 1,
        });

        this.beforeRender(ctx);

        this.material.value.apply();

        ctx.graphics.drawFullScreen();

        ctx.bindDefaultFramebuffer();

        ctx.swapTargets();
    }

    public override resize(ctx: RenderContext): void {}

    public override dispose(): void {
        this.material?.dispose();
        this.shader?.dispose();

        this.material = undefined!;
        this.shader = undefined!;
    }
}