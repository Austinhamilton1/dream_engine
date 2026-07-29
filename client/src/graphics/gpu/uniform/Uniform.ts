import type { ShaderProgram } from "../shader/ShaderProgram";

export abstract class Uniform<T> {
    protected value: T;

    constructor(
        public readonly name: string,
        initialValue: T,
    ) {
        this.value = initialValue;
    }

    public set(value: T): void {
        this.value = value;
    }

    public abstract upload(program: ShaderProgram): void;
}

export class FloatUniform extends Uniform<number> {
    public upload(program: ShaderProgram): void {
        program.setFloat(this.name, this.value);
    }
}

export class IntUniform extends Uniform<number> {
    public upload(program: ShaderProgram): void {
        program.setInt(this.name, this.value);
    }
}

export class Vec2Uniform extends Uniform<[number, number]> {
    public upload(program: ShaderProgram): void {
        program.setVector2(this.name, this.value[0], this.value[1]);
    }
}

export class Vec3Uniform extends Uniform<[number, number, number]> {
    public upload(program: ShaderProgram): void {
        program.setVector3(this.name, this.value[0], this.value[1], this.value[2]);
    }
}