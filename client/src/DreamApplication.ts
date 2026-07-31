import { Application } from "./core/Application";
import type { Engine } from "./core/Engine";
import { PresentPass } from "./graphics/renderer/PresentPass";
import { DreamPass } from "./passes/DreamPass";
import { MandelbrotPass } from './passes/MandelbrotPass';
import { PaintPass } from "./passes/PaintPass";

export class DreamApplication extends Application {
    public override async initialize(engine: Engine): Promise<void> {
        await super.initialize(engine);

        const renderer = this.engine.getRenderer();

        renderer.addPass(
            new DreamPass()
        );

        renderer.addPass(
            new MandelbrotPass()
        );

        renderer.addPass(
            new PaintPass()
        );

        renderer.addPass(
            new PresentPass()
        )

        await renderer.initialize(this.engine);
    }

    public override update(deltaTime: number): void {
        
    }

    public override render(): void {
        this.engine
            .getRenderer()
            .render()
    }

    public override shutdown(): void {
        this.engine
            .getRenderer()
            .dispose();
    }
}