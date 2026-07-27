export abstract class AssetLoader<T> {
    protected cache = new Map<string, T>();

    protected has(path: string): boolean {
        return this.cache.has(path);
    }

    protected get(path: string): T | undefined {
        return this.cache.get(path);
    }

    protected store(path: string, value: T): void {
        this.cache.set(path, value);
    }

    public abstract load(path: string): Promise<T>;
}