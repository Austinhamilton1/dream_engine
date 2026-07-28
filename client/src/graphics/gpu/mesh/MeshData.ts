import type { VertexLayout } from "../layout/VertexLayout";

export enum PrimitiveType {
    Triangles,
    Lines,
    Points,
}

export interface MeshData {
    vertices: Float32Array;
    indices?: Uint16Array;
    layout: VertexLayout;
    primitive?: PrimitiveType;
}