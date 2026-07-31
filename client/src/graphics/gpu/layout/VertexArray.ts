import { Logger } from "../../../core/Logger";
import type { Disposable } from "../../Disposable";
import type { IndexBuffer } from "../buffer/IndexBuffer";
import type { VertexBuffer } from "../buffer/VertexBuffer";
import type { VertexLayout } from "./VertexLayout";

export class VertexArray implements Disposable {
    private readonly gl: WebGL2RenderingContext;
    private vao: WebGLVertexArrayObject | null;

    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;

        const vao = gl.createVertexArray();
        if(!vao) {
            Logger.error('Failed to create vertex array');
            throw new Error('Invalid vertex array');
        }

        this.vao = vao;
    }

    public bind(): void {
        this.gl.bindVertexArray(
            this.getVAO(),
        );
    }

    public unbind(): void {
        this.gl.bindVertexArray(null);
    }

    public addVertexBuffer(
        buffer: VertexBuffer,
        layout: VertexLayout,
    ): void {
        this.bind();
        buffer.bind();

        for(const attribute of layout.attributes) {
            this.gl.enableVertexAttribArray(
                attribute.location
            );

            this.gl.vertexAttribPointer(
                attribute.location,
                attribute.components,
                this.gl.FLOAT,
                attribute.normalized,
                layout.stride,
                attribute.offset,
            );
        }
    }

    public setIndexBuffer(
        buffer: IndexBuffer,
    ): void {
        this.bind();
        buffer.bind();
    }

    private getVAO(): WebGLVertexArrayObject {
        if(!this.vao) {
            Logger.error('Vertex array has been destroyed');
            throw new Error('Invalid vertex array');
        }

        return this.vao;
    }

    public dispose(): void {
        if(this.vao) {
            this.gl.deleteVertexArray(this.vao);

            this.vao = null;
        }
    }
}