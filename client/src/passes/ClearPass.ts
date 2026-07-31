import type { RenderContext } from "../graphics/renderer/RenderContext";
import { RenderPass } from "../graphics/renderer/RenderPass";

export class ClearPass extends RenderPass {
    public render(ctx: RenderContext): void {
        ctx.graphics
            .clear({
                r: 0.0,
                g: 0.0,
                b: 0.0,
                a: 1.0,
            });
    }
}