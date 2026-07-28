import { Application } from "./core/Application";
import type { Engine } from "./core/Engine";
import { ClearPass } from "./graphics/renderer/passes/ClearPass";
import { DreamPass } from "./graphics/renderer/passes/DreamPass";

export class DreamApplication extends Application {
    public override async initialize(engine: Engine): Promise<void> {
        await super.initialize(engine);

        const renderer = this.engine.getRenderer();

        renderer.addPass(
            new ClearPass()
        );

        renderer.addPass(
            new DreamPass()
        );

        await renderer.initialize({
            graphics: this.engine.getGraphics(),
            manager: this.engine.getAssetManager(),
            width: this.engine.getCanvas().element.width,
            height: this.engine.getCanvas().element.height,
        });
    }

    public override update(deltaTime: number): void {
        
    }

    public override render(): void {
        this.engine
            .getRenderer()
            .render({
                graphics: this.engine.getGraphics(),
                manager: this.engine.getAssetManager(),
                width: this.engine.getCanvas().element.width,
                height: this.engine.getCanvas().element.height,
            })
    }

    public override shutdown(): void {
        this.engine
            .getRenderer()
            .dispose();
    }
}