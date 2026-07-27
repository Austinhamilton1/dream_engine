export class DebugOverlay {
    private element: HTMLDivElement;

    constructor() {
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

        this.element.innerText = 'FPS: --';

        document.body.appendChild(this.element);
    }

    public update(
        fps: number,
        frame: number,
        delta: number,
        width: number,
        height: number,
    ): void {
        this.element.innerHTML = 
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