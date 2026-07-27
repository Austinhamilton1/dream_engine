import type { GraphicsDevice } from "./gpu/shader/GraphicsDevice";

export class FullscreenTriangle {
    private readonly graphics: GraphicsDevice;

    constructor(
        graphics: GraphicsDevice,
    ) {
        this.graphics = graphics;
    }

    public draw(): void {
        const gl = this.graphics.getContext();

        gl.drawArrays(
            gl.TRIANGLES,
            0, 
            3,
        );
    }
}