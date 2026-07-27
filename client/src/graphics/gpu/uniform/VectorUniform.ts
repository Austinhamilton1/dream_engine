import type { ShaderProgram } from "../shader/ShaderProgram";
import { Uniform } from "./Uniform";

export class Vec2Uniform extends Uniform<[number, number]> {
    public upload(program: ShaderProgram): void {
        program.setVector2(this.name, this.value[0], this.value[1]);
    }
}