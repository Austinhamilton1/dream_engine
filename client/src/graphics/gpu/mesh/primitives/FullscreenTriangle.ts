import type { VertexAttribute } from "../../layout/VertexAttribute";
import { VertexLayout } from "../../layout/VertexLayout";
import { Mesh } from "../Mesh";
import { PrimitiveType, type MeshData } from "../MeshData";

export function createFullscreenTriangle(
    gl: WebGL2RenderingContext,
): Mesh {
    const attributes: VertexAttribute[] = [
        {
            // vec2 position
            location: 0,
            components: 2,
            normalized: false,
            offset: 0,
        },
        {
            location: 1,
            components: 2,
            normalized: false,
            offset: 2 * Float32Array.BYTES_PER_ELEMENT,
        },
    ];

    const layout = new VertexLayout(
        4 * Float32Array.BYTES_PER_ELEMENT,
        attributes,
        4,
    );

    const vertices = new Float32Array([
        // position     uv
        -1.0, -1.0,     0.0, 0.0,
        3.0, -1.0,      2.0, 0.0,
        -1.0, 3.0,      0.0, 2.0,
    ]);

    const data: MeshData = {
        vertices,
        layout,
        primitive: PrimitiveType.Triangles,
    };

    return new Mesh(
        gl,
        data,
    );
}