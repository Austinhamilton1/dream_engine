import { Logger } from "../core/Logger";

export class Keyboard {
    private static instance: Keyboard | null = null;

    // This will contain the set of all keys currently down
    private static downKeys = new Set<string>();

    private constructor() {
        Logger.info('Initializing Keyboard...');
        
        // Javascript does not maintain key state, so we 
        // must do it ourselves.
        window.addEventListener('keydown', (event) => {
            Keyboard.downKeys.add(event.key.toLowerCase());
        });

        window.addEventListener('keyup', (event) => {
            Keyboard.downKeys.delete(event.key.toLowerCase());
        });
    }

    public static getInstance(): Keyboard {
        if(!Keyboard.instance) {
            Keyboard.instance = new Keyboard();
        }
        return Keyboard.instance;
    }

    public isKeyDown(key: string): boolean {
        return Keyboard.downKeys.has(key);
    }

    public isKeyUp(key: string): boolean {
        return !Keyboard.downKeys.has(key);
    }
}