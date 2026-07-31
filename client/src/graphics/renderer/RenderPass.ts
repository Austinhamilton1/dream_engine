import type { Uniform } from "../gpu/uniform/Uniform";
import type { RenderContext } from "./RenderContext";

export abstract class RenderPass {
    protected uniforms = new Map<string, Uniform<any>>();

    public async initialize(ctx: RenderContext): Promise<void> {};

    public resize(ctx: RenderContext): void {};

    public abstract render(ctx: RenderContext): void;

    public dispose(): void {};

    public addDependency<T>(name: string, priority = 0): void {

    }

    public outputs<T>(name: string): void {

    }
}