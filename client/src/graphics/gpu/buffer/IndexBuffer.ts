import { Buffer } from "./Buffer";

export class IndexBuffer extends Buffer {
    private indexCount = 0;

    constructor(gl: WebGL2RenderingContext) {
        super(gl, gl.ELEMENT_ARRAY_BUFFER);
    }

    public setData(
        data: Uint16Array,
        usage = this.gl.STATIC_DRAW,
    ): void {
        this.bind();

        this.gl.bufferData(
            this.target,
            data,
            usage,
        );

        this.indexCount = data.length;
    }

    public update(
        offset: number,
        data: Uint16Array,
    ): void {
        this.bind();

        this.gl.bufferSubData(
            this.target,
            offset,
            data,
        );

        this.indexCount = data.length;
    }

    public getCount(): number {
        return this.indexCount;
    }
}