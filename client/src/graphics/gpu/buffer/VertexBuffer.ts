import { Buffer } from "./Buffer";

export class VertexBuffer extends Buffer {
    private vertexCount = 0;

    constructor(gl: WebGL2RenderingContext) {
        super(gl, gl.ARRAY_BUFFER);
    }

    public setData(
        data: Float32Array,
        usage = this.gl.STATIC_DRAW,
    ): void {
        this.bind();

        this.gl.bufferData(
            this.target,
            data,
            usage,
        );

        this.vertexCount = data.length;
    }

    public update(
        offset: number,
        data: Float32Array,
    ): void {
        this.bind();

        this.gl.bufferSubData(
            this.target,
            offset,
            data,
        );

        this.vertexCount = data.length;
    }

    public getCount(): number {
        return this.vertexCount;
    }
}