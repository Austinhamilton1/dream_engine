import type { EngineConfig } from "../core/Config";
import type { EventBus } from "../core/EventBus";
import { EngineEvent } from "../core/EngineEvents";
import type { WindowResizeEvent } from "../core/EngineEvents"
import { Logger } from "../core/Logger";

export class Canvas {
    readonly element: HTMLCanvasElement;

    /*
     * Create and add a canvas to the page.
     */
    constructor(
        config: EngineConfig,
        private readonly eventBus: EventBus,
    ) {
        Logger.info('Initializing Canvas')
        this.element = document.createElement('canvas');

        this.element.width = config.width;
        this.element.height = config.height;

        this.element.style.width = '100vw';
        this.element.style.height = '100vh';
        this.element.style.display = 'block';

        document.body.style.margin = '0';
        document.body.style.overflow = 'hidden';

        document.body.appendChild(this.element);

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    private resize() {
        Logger.info('Canvas resize');
        
        this.element.width = window.innerWidth;
        this.element.height = window.innerHeight;

        // Let everything know that the canvas has been resized.
        this.eventBus.emit(
            EngineEvent.WindowResize,
            {
                width: this.element.width,
                height: this.element.height,
            }
        )
    }
}