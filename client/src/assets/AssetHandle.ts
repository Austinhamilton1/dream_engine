import { Asset } from "./Asset";

export class AssetHandle<T> {
    private disposed = false;

    constructor(
        private readonly asset: Asset<T>,
        private readonly onRelease: (asset: Asset<T>) => void,
    ) {
        asset.acquire();
    }

    public get value(): T {
        return this.asset.get();
    }

    public clone(): AssetHandle<T> {
        return new AssetHandle(
            this.asset,
            this.onRelease,
        );
    }

    public dispose(): void {
        if(this.disposed) {
            return;
        }

        this.disposed = true;

        this.onRelease(this.asset);
    }
}