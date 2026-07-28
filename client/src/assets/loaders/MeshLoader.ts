import { Logger } from "../../core/Logger";
import { VertexLayout } from "../../graphics/gpu/layout/VertexLayout";
import { Mesh } from "../../graphics/gpu/mesh/Mesh";
import { PrimitiveType, type MeshData } from "../../graphics/gpu/mesh/MeshData";
import type { GraphicsDevice } from "../../graphics/gpu/shader/GraphicsDevice";
import { AssetLoader } from "../AssetLoader";

export class MeshLoader extends AssetLoader<Mesh> {
    constructor(
        private readonly graphics: GraphicsDevice,
        private readonly dataSource: string,
    ) {
        super();
    }

    private async fetchDataSource(path: string): Promise<MeshData> {
        const response = await fetch(path);
        if(!response.ok) {
            Logger.error('Could not load mesh source: "%s"', path);
            throw new Error('Invalid path');
        }

        const data = await response.json();

        const vertices = new Float32Array(data.vertices);
        const indices = data.indices ? new Uint16Array(data.indices) : undefined;
        
        let primitive = PrimitiveType.Triangles;
        if(data.primitive === 'triangles') {
            primitive = PrimitiveType.Triangles;
        } else if(data.primitive === 'lines') {
            primitive = PrimitiveType.Lines;
        } else if(data.primitive === 'points') {
            primitive = PrimitiveType.Points;
        } else {
            Logger.error('Invalid primitive type: "%s"', data.primitive);
            throw new Error('Could not load mesh');
        }

        const layout = new VertexLayout(
            data.layout.stride,
            data.layout.attributes,
            data.layout.size,
        );

        return {
            vertices,
            indices,
            primitive,
            layout,
        };
    }

    public async load(): Promise<Mesh> {
        const data = await this.fetchDataSource(this.dataSource);

        return new Mesh(
            this.graphics.getContext(),
            data,
        );
    }
}