import type { ClearColor } from "../core/Config";
import { FullscreenTriangle } from "./FullscreenTriangle";
import type { GraphicsDevice } from "./gpu/shader/GraphicsDevice";
import type { ShaderProgram } from "./gpu/shader/ShaderProgram";

export class Renderer {
    private triangle: FullscreenTriangle;

    constructor(
        private readonly graphics: GraphicsDevice
    ) {
        this.triangle = new FullscreenTriangle(graphics);
    }

    public clear(color: ClearColor): void {
        this.graphics.clear(color);
    }

    public drawFullscreen(
        program: ShaderProgram,
        beforeDraw?: () => void,
    ): void {
        program.use();

        if(beforeDraw)
            beforeDraw();

        this.triangle.draw();
    }
}