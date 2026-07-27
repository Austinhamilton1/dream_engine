import type { ClearColor } from "../core/Config";
import type { GraphicsDevice } from "./GraphicsDevice";

export class Renderer {
    constructor(
        private readonly graphics: GraphicsDevice
    ) {}

    public clear(color: ClearColor): void {
        this.graphics.clear(color);
    }
}