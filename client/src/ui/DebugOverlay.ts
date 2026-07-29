import { EngineEvent } from "../core/EngineEvents";
import type { EventBus } from "../core/EventBus";

export class DebugOverlay {
    private element: HTMLDivElement;
    private info: HTMLDivElement;
    private runButton: HTMLButtonElement;
    private running: boolean = true;
    private stepButton: HTMLButtonElement;

    constructor(
        private readonly eventBus: EventBus
    ) {
        this.element = document.createElement('div');

        this.element.style.position = 'fixed';
        this.element.style.top = '10px';
        this.element.style.left = '10px';

        this.element.style.padding = '8px 12px';

        this.element.style.background = 'rgba(0,0,0,0.65)';
        this.element.style.color = '#ffffff';

        this.element.style.fontFamily = 'monospace';
        this.element.style.fontSize = '14px';

        this.element.style.borderRadius = '4px';
        this.element.style.pointerEvents = 'none';

        this.info = document.createElement('div');
        this.info.innerText = 'FPS: --';

        this.runButton = document.createElement('button');

        this.runButton.textContent = 'Stop';
        this.runButton.style.pointerEvents = 'auto';

        this.runButton.addEventListener('click', () => {
            if(this.running) {
                this.stop();
            } else {
                this.start()
            }
        });

        this.stepButton = document.createElement('button');

        this.stepButton.textContent = 'Step';
        this.stepButton.style.pointerEvents = 'auto';

        this.stepButton.addEventListener('click', () => {
            this.step();
        });

        document.body.appendChild(this.element);
        this.element.appendChild(this.info);
        this.element.appendChild(this.runButton);
        this.element.appendChild(this.stepButton);
    }

    private stop() {
        console.log('stop pressed');
        this.eventBus.emit(
            EngineEvent.EngineStop,
            {
                source: 'DebugOverlay.ts',
            }
        );

        this.running = !this.running;
        this.runButton.textContent = 'Start';
    }

    private start() {
        this.eventBus.emit(
            EngineEvent.EngineStart,
            {
                source: 'DebugOverlay.ts',
            }
        );

        this.running = !this.running;
        this.runButton.textContent = 'Stop';
    }

    private step() {
        this.eventBus.emit(
            EngineEvent.EngineStep,
            {
                source: 'DebugOverlay.ts',
            }
        );
    }

    public update(
        fps: number,
        frame: number,
        delta: number,
        width: number,
        height: number,
    ): void {
        this.info.innerHTML = 
`
Dream Engine

FPS: ${fps.toFixed(0)}
<br />
Frame: ${frame}
<br />
Delta: ${(delta * 1000).toFixed(2)} ms
<br />
<br />
Renderer: WebGL2
<br />
Resolution: ${width}x${height}
`
    }
}