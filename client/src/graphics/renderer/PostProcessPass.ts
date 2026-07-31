import type { AssetHandle } from "../../assets/AssetHandle";
import type { Material } from "../material/Material";
import type { RenderContext } from "./RenderContext";
import { RenderPass } from "./RenderPass";

export abstract class PostProcessPass extends RenderPass {
    protected abstract material: AssetHandle<Material>;
    
    protected beforeRender(ctx: RenderContext): void {};
    
    public override render(ctx: RenderContext): void {
        const target = ctx.target.write();

        target.bind();

        this.beforeRender(ctx);

        this.material.value.apply();
        
        ctx.graphics.drawFullScreen();

        target.unbind();

        ctx.target.swap();
    }
}