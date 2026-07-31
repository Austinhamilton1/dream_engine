import type { Disposable } from "../../Disposable";
import { IndexBuffer } from "../buffer/IndexBuffer";
import { VertexBuffer } from "../buffer/VertexBuffer";
import { VertexArray } from "../layout/VertexArray";
import { PrimitiveType, type MeshData } from "./MeshData";

export class Mesh implements Disposable {
    private readonly gl: WebGL2RenderingContext;
    private readonly vao: VertexArray;
    private readonly vertexBuffer: VertexBuffer;

    private indexBuffer?: IndexBuffer;
    private drawCount = 0;
    private primitive: number;

    constructor(
        gl: WebGL2RenderingContext,
        data: MeshData,
    ) {
        this.gl = gl;
        this.vao = new VertexArray(gl);
        this.vertexBuffer = new VertexBuffer(gl);

        this.vertexBuffer.setData(
            data.vertices
        );

        this.vao.addVertexBuffer(
            this.vertexBuffer,
            data.layout,
        );

        if(data.indices) {
            this.indexBuffer = new IndexBuffer(gl);
            this.indexBuffer.setData(
                data.indices
            );
            this.drawCount = 
                data.indices.length /
                data.layout.vertexSize;
        } else {
            this.drawCount = 
                data.vertices.length /
                data.layout.vertexSize;
        }

        this.primitive = gl.TRIANGLES;
        if(data.primitive === PrimitiveType.Lines) {
            this.primitive = gl.LINES;
        } else if(data.primitive === PrimitiveType.Points) {
            this.primitive = gl.POINTS;
        }
    }

    public bind(): void {
        this.vao.bind();
    }

    public draw(): void {
        this.bind();

        if(this.indexBuffer) {
            this.gl.drawElements(
                this.primitive,
                this.drawCount,
                this.gl.UNSIGNED_SHORT,
                0,
            );
        } else {
            this.gl.drawArrays(
                this.primitive,
                0,
                this.drawCount,
            );
        }
    }

    public dispose(): void {
        this.vao.destroy();
        this.vertexBuffer.destroy();

        if(this.indexBuffer) {
            this.indexBuffer.destroy();
        }
    }
}