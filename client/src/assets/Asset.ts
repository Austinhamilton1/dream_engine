export class Asset<T> {
    private readonly value: T;
    private references = 0;

    constructor(value: T) {
        this.value = value;
    }

    public acquire(): void {
        this.references++;
    }

    public release(): boolean {
        this.references--;

        return this.references <= 0;
    }

    public get(): T {
        return this.value;
    }

    public get refCount(): number {
        return this.references;
    }
}