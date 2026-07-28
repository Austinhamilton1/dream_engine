import type { RenderPass } from "./passes/RenderPass";
import type { RenderContext } from "./RenderContext";

export class Renderer {
    private readonly passes: RenderPass[] = [];
    private initialized = false;

    public addPass(pass: RenderPass): void {
        this.passes.push(pass);
    }

    public async initialize(ctx: RenderContext): Promise<void> {
        if(this.initialized) return;

        for(const pass of this.passes) {
            await pass.initialize(ctx);
        }

        this.initialized = true;
    }

    public resize(ctx: RenderContext): void {
        for(const pass of this.passes) {
            pass.resize(ctx);
        }
    }

    public render(ctx: RenderContext): void {
        if(!this.initialized) {
            this.initialize(ctx);
        }

        for(const pass of this.passes) {
            pass.render(ctx);
        }
    }

    public dispose(): void {
        for(const pass of this.passes) {
            pass.dispose();
        }

        this.initialized = false;
    }
}