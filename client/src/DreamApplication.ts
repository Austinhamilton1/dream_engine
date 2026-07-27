import { Application } from "./core/Application";
import type { Engine } from "./core/Engine";
import { Shader } from "./graphics/Shader";
import { ShaderProgram } from "./graphics/ShaderProgram";
import { ShaderType } from "./graphics/ShaderType";

export class DreamApplication extends Application {
    public override initialize(engine: Engine): void {
        super.initialize(engine);

        const vertex = new Shader(
            this.engine.getGraphics(),
            ShaderType.Vertex,
            '#version 300 es\nvoid main(){}',
        );

        const fragment = new Shader(
            this.engine.getGraphics(),
            ShaderType.Fragment,
            '#version 300 es\nvoid main(){}',
        );

        const program = new ShaderProgram(
            this.engine.getGraphics(),
            vertex,
            fragment,
        );

        program.use();
    }

    public override update(deltaTime: number): void {
        
    }

    public override render(): void {
        this.engine
            .getRenderer()
            .clear(
                this.engine.config.clearColor
            );   
    }

    public override shutdown(): void {
        
    }
}