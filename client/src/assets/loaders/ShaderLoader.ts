import { Logger } from "../../core/Logger";
import type { GraphicsDevice } from "../../graphics/gpu/shader/GraphicsDevice";
import { Shader } from "../../graphics/gpu/shader/Shader";
import { ShaderProgram } from "../../graphics/gpu/shader/ShaderProgram";
import { ShaderType } from "../../graphics/gpu/shader/ShaderType";
import { AssetLoader } from "../AssetLoader";

export class ShaderLoader extends AssetLoader<ShaderProgram> {
    constructor(
        private readonly graphics: GraphicsDevice,
        private readonly vertexSource: string,
        private readonly fragmentSource: string,
    ) {
        super();
    }

    private async preprocess(source: string): Promise<string> {
        const lines = source.split('\n');

        const includes = 
            lines
                .filter(line => line.startsWith('#include'))
                .map(include => include.match(
                    /^#include <(.*)>$/
                ))
                .filter(match => match !== null)
                .map(match => match[1]);

        let preprocessed = source;
        for(let i = 0; i < includes.length; i++) {
            const directive = `#include <${includes[i]}>`;
            const path = `/src/common/shaders/${includes[i]}`;
            
            const response = await fetch(path);
            if(!response.ok) {
                Logger.error('Unable to load include: "%s"', path);
                throw new Error('Invalid include');
            }

            const replaceWith = await response.text();
            preprocessed = preprocessed.replace(directive, replaceWith);
        }

        return preprocessed;
    }

    private async fetchSource(path: string): Promise<string> {
        const response = await fetch(path);
        if(!response.ok) {
            Logger.error('Unable to load shader: "%s"', path);
            throw new Error('Invalid path');
        }

        let source = await response.text();
        source = await this.preprocess(source);

        return source;
    }
    
    public async load(): Promise<ShaderProgram> {
        const vertexSource = await this.fetchSource(this.vertexSource);
        const fragmentSource = await this.fetchSource(this.fragmentSource);

        const vertex = new Shader(
            this.graphics,
            ShaderType.Vertex,
            vertexSource,
        );

        const fragment = new Shader(
            this.graphics,
            ShaderType.Fragment,
            fragmentSource,
        )

        const program = new ShaderProgram(
            this.graphics,
            vertex,
            fragment,
        )

        return program;
    }
}