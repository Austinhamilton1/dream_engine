import { ShaderLoader } from "../assets/ShaderLoader";
import { Canvas } from "../graphics/Canvas";
import { GraphicsDevice } from "../graphics/gpu/shader/GraphicsDevice";
import { Renderer } from "../graphics/Renderer";
import { DebugOverlay } from "../ui/DebugOverlay";
import type { Application } from "./Application";
import type { EngineConfig } from "./Config";
import { EventBus } from "./EventBus";
import { Logger } from "./Logger";
import { Timer } from "./Timer";

export class Engine {
    private running = false;
    private fpsCounter: DebugOverlay;

    public readonly config: EngineConfig;

    private readonly eventBus: EventBus;
    private readonly canvas: Canvas;
    private readonly application: Application;
    private readonly graphics: GraphicsDevice;
    private readonly renderer: Renderer;
    private readonly shaderLoader: ShaderLoader;

    constructor(application: Application, config: EngineConfig) {
        this.application = application;
        this.config = config;

        this.eventBus = new EventBus();

        this.canvas = new Canvas(
            config, 
            this.eventBus,
        );

        this.graphics = new GraphicsDevice(
            this.canvas, 
            this.eventBus,
        );

        this.renderer = new Renderer(this.graphics);

        this.shaderLoader = new ShaderLoader();
        
        Timer.initialize();

        this.fpsCounter = new DebugOverlay();
    }

    public async initialize(): Promise<void> {
        await this.application.initialize(this);
    }

    public getCanvas(): Canvas {
        return this.canvas;
    }

    public getGraphics(): GraphicsDevice {
        return this.graphics;
    }

    public getRenderer(): Renderer {
        return this.renderer;
    }

    public getShaderLoader(): ShaderLoader {
        return this.shaderLoader;
    }

    public run(): void {
        Logger.info('Starting Dream Engine');
        this.running = true;
        requestAnimationFrame(this.loop);
    }

    public stop(): void {
        this.running = false;
        this.application.shutdown();
        Logger.info('Dream Engine Stopped');
    }

    private loop = () => {
        if(!this.running) return;

        Timer.update();

        const viewport = this.graphics.getViewport();

        this.fpsCounter.update(
            Timer.fps,
            Timer.frame,
            Timer.deltaTime,
            viewport.width,
            viewport.height,
        );

        this.application.update(Timer.deltaTime);
        this.application.render();

        requestAnimationFrame(this.loop);
    }
}