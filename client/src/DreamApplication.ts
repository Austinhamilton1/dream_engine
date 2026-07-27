import { Application } from "./core/Application";
import type { Engine } from "./core/Engine";
import { Timer } from "./core/Timer";
import { Shader } from "./graphics/gpu/shader/Shader";
import { ShaderProgram } from "./graphics/gpu/shader/ShaderProgram";
import { ShaderType } from "./graphics/gpu/shader/ShaderType";
import { FloatUniform } from "./graphics/gpu/uniform/FloatUniform";
import type { Uniform } from "./graphics/gpu/uniform/Uniform";
import { Vec2Uniform } from "./graphics/gpu/uniform/VectorUniform";

export class DreamApplication extends Application {
    private program!: ShaderProgram;
    private uniforms = new Map<string, Uniform<any>>();

    public override async initialize(engine: Engine): Promise<void> {
        await super.initialize(engine);

        const graphics = engine.getGraphics();
        const loader = engine.getShaderLoader();

        const vertexSource = await loader.load(
            '/src/shaders/fullscreen.vert'
        );

        const fragmentSource = await loader.load(
            '/src/shaders/dream_field.frag'
        );

        const vertex = new Shader(
            graphics,
            ShaderType.Vertex,
            vertexSource,
        );

        const fragment = new Shader(
            graphics,
            ShaderType.Fragment,
            fragmentSource,
        );

        this.program = new ShaderProgram(
            graphics,
            vertex,
            fragment,
        );

        this.uniforms.set('uTime', new FloatUniform('uTime', 0));

        const viewport = graphics.getViewport();
        this.uniforms.set('uResolution', new Vec2Uniform('uResolution', [viewport.width, viewport.height]));
    }

    public override update(deltaTime: number): void {
        
    }

    public override render(): void {
        this.engine
            .getRenderer()
            .clear(
                this.engine.config.clearColor
            );  
            
        this.engine
            .getRenderer()
            .drawFullscreen(
                this.program,
                () => {
                    const uTime = this.uniforms.get('uTime');
                    if(uTime) {
                        uTime.set(Timer.elapsedTime);
                        uTime.upload(this.program);
                    }

                    const viewport = 
                        this.engine
                            .getGraphics()
                            .getViewport();

                    const uResolution = this.uniforms.get('uResolution');
                    if(uResolution) {
                        uResolution.set([viewport.width, viewport.height]);
                        uResolution.upload(this.program);
                    }
                }
            );
    }

    public override shutdown(): void {
        
    }
}