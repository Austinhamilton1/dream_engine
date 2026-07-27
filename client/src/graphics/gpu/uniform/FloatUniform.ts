import type { ShaderProgram } from "../shader/ShaderProgram";
import { Uniform } from "./Uniform";

export class FloatUniform extends Uniform<number> {
    public upload(program: ShaderProgram): void {
        program.setFloat(this.name, this.value);
    }
}