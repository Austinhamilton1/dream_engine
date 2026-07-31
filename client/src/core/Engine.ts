import { AssetManager } from "../assets/AssetManager";
import { Canvas } from "../graphics/Canvas";
import { GraphicsDevice } from "../graphics/gpu/GraphicsDevice";
import { Renderer } from "../graphics/renderer/Renderer";
import { DebugOverlay } from "../ui/DebugOverlay";
import type { Application } from "./Application";
import type { EngineConfig } from "./Config";
import { EngineEvent } from "./EngineEvents";
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
    private readonly manager: AssetManager;

    constructor(application: Application, config: EngineConfig) {
        this.application = application;
        this.config = config;

        this.eventBus = new EventBus();

        this.canvas = new Canvas(
            config, 
            this.eventBus,
        );

        this.graphics = new GraphicsDevice(this.canvas);

        this.renderer = new Renderer();

        this.manager = new AssetManager();
        
        Timer.initialize();

        this.fpsCounter = new DebugOverlay(this.eventBus);

        this.eventBus.on(
            EngineEvent.WindowResize,
            ({ width, height }) => {
                this.renderer.resize(width, height);
            }
        )

        this.eventBus.on(
            EngineEvent.EngineStart,
            async ({ source }) => {
                Logger.info('Starting engine from "%s"', source);
                await this.initialize();
                this.run();
            }
        );

        this.eventBus.on(
            EngineEvent.EngineStop,
            ({ source }) => {
                Logger.info('Stopping engine from "%s"', source);
                this.stop();
            }
        );

        this.eventBus.on(
            EngineEvent.EngineStep,
            async ({ source }) => {
                Logger.info('Stepping engine from "%s"', source);
                await this.step();
            }
        );
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

    public getAssetManager(): AssetManager {
        return this.manager;
    }

    public run(): void {
        if(this.running) return;

        Logger.info('Starting Dream Engine');
        Timer.update();
        Timer.resetFrameTime();
        this.running = true;
        requestAnimationFrame(this.loop);
    }

    public stop(): void {
        this.running = false;
        this.application.shutdown();
        this.graphics.dispose();
        this.manager.dispose();
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

    private step = async () => {
        if(this.running) return;

        await this.initialize();

        Timer.update();
        Timer.resetFrameTime();
        Timer.deltaTime = 0.01667;
        Timer.elapsedTime += 0.01667;

        const viewport = this.graphics.getViewport();

        this.fpsCounter.update(
            60,
            Timer.frame,
            0.01667,
            viewport.width,
            viewport.height,
        );

        // At each step update at 60 fps 
        this.application.update(0.01667);
        this.application.render();

        this.stop();
    }
}