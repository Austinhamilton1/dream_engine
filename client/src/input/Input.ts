import { Keyboard } from "./Keyboard";
import { Mouse } from "./Mouse";

export class Input {
    public static keyboard: Keyboard = Keyboard.getInstance();
    public static mouse: Mouse = Mouse.getInstance();
}