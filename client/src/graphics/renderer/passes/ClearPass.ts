import type { RenderContext } from "../RenderContext";
import { RenderPass } from "./RenderPass";

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