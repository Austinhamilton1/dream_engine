import { Engine } from "./Engine";

export abstract class Application {
    protected engine!: Engine;

    /*
     * Called once after the engine has initialized.
     */
    public async initialize(engine: Engine): Promise<void> {
        this.engine = engine;
    }

    /*
     * Called every frame before rendering.
     */
    public abstract update(deltaTime: number): void;

    /*
     * Called every frame.
     */
    public abstract render(): void;

    /*
     * Called before the engine shuts down.
     */
    public shutdown(): void {}
}