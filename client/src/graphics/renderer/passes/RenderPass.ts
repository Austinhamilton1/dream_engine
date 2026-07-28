import type { RenderContext } from "../RenderContext";

export abstract class RenderPass {
    public async initialize(ctx: RenderContext): Promise<void> {};

    public resize(ctx: RenderContext): void {};

    public abstract render(ctx: RenderContext): void;

    public dispose(): void {};
}