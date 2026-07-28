export abstract class AssetLoader<T> {
    public abstract load(): Promise<T>;
}