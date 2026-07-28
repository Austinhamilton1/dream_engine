import type { VertexAttribute } from "./VertexAttribute";

export class VertexLayout {
    constructor(
        public readonly stride: number,
        public readonly attributes: VertexAttribute[],
        public readonly vertexSize: number,
    ) {}
}