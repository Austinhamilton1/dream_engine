import type { RenderPass } from "./RenderPass";
import { RenderContext } from "./RenderContext";
import { PingPongFramebuffer } from "../gpu/framebuffer/PingPongFramebuffer";
import type { Disposable } from "../Disposable";
import type { Engine } from "../../core/Engine";

export class Renderer implements Disposable {
    private readonly passes: RenderPass[] = [];
    private context?: RenderContext;

    public addPass(pass: RenderPass): void {
        this.passes.push(pass);
    }

    public async initialize(
        engine: Engine,
    ): Promise<void> {
        const graphics = engine.getGraphics();
        const manager = engine.getAssetManager();
        const width = engine.getCanvas().element.width;
        const height = engine.getCanvas().element.height;
        
        const target = new PingPongFramebuffer(
            graphics.getContext(),
            width,
            height,
        );

        this.context = new RenderContext(
            graphics,
            manager,
            target,
            width,
            height,
        );

        for(const pass of this.passes) {
            await pass.initialize(this.context);
        }
    }

    public resize(
        width: number,
        height: number,
    ): void {
        if(!this.context) return;

        this.context.resize(width, height);

        for(const pass of this.passes) {
            pass.resize(this.context);
        }
    }

    public render(): void {
        if(!this.context) return;

        for(const pass of this.passes) {
            pass.render(this.context);
        }
    }

    public dispose(): void {
        if(this.context) {
            for(const pass of this.passes) {
                pass.dispose();
            }

            this.context.dispose();
        }

        this.passes.length = 0;
        this.context = undefined;
    }
}