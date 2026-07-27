import { Logger } from "../core/Logger";

interface MousePosition {
    x: number;
    y: number;
}

interface MouseButtons {
    leftDown: boolean;
    middleDown: boolean;
    rightDown: boolean;
}

interface Scroll {
    scrollX: number;
    scrollY: number;
}

export class Mouse {
    private static instance: Mouse | null = null;

    public static position: MousePosition;
    public static delta: MousePosition;
    public static buttons: MouseButtons;
    public static wheel: Scroll;

    private constructor() {
        Logger.info('Initializing mouse...');

        // Convert Mouse events into Mouse state
        window.addEventListener('mousemove', (event) => {
            const x = event.clientX;
            const y = event.clientY;

            if(Mouse.position.x && Mouse.position.y) {
                Mouse.delta.x = Mouse.position.x - x;
                Mouse.delta.y = Mouse.position.y - y;
            }

            Mouse.position.x = x;
            Mouse.position.y = y;
        });

        window.addEventListener('mousedown', (event) => {
            if(event.button === 0)
                Mouse.buttons.leftDown = true;

            if(event.button === 1)
                Mouse.buttons.middleDown = true;

            if(event.button === 2)
                Mouse.buttons.rightDown = true;
        });

        window.addEventListener('mouseup', (event) => {
            if(event.button === 0)
                Mouse.buttons.leftDown = false;

            if(event.button === 1)
                Mouse.buttons.middleDown = false;

            if(event.button === 2)
                Mouse.buttons.rightDown = false;
        });

        window.addEventListener('scroll', () => {
            Mouse.wheel.scrollX = window.scrollX;
            Mouse.wheel.scrollY = window.scrollY;
        });
    }

    public static getInstance(): Mouse {
        if(!Mouse.instance) {
            Mouse.instance = new Mouse();
        }
        return Mouse.instance;
    }
}