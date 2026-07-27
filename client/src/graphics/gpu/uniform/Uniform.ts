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