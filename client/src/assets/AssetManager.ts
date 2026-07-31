import { Logger } from "../core/Logger";
import type { Disposable } from "../graphics/Disposable";
import { Asset } from './Asset';
import { AssetHandle } from "./AssetHandle";
import type { AssetLoader } from "./AssetLoader";

export class AssetManager {
    private readonly assets = new Map<string, Asset<Disposable>>();
    private readonly loading = new Map<string, Promise<Asset<Disposable>>>();

    public async load<T extends Disposable>(
        name: string,
        loader: AssetLoader<T>
    ): Promise<AssetHandle<T>> {
        // Already loaded
        const existing = this.assets.get(name);
        if(existing) {
            return new AssetHandle(
                existing as Asset<T>,
                () => this.release(name),
            );
        }

        // Currently loading
        const pending = this.loading.get(name);
        if(pending) {
            const asset = await pending;
            return new AssetHandle(
                asset as Asset<T>,
                () => this.release(name),
            );
        }

        // Begin loading
        const promise = loader.load().then(resource => {
            const asset = new Asset(resource);

            this.assets.set(name, asset);
            this.loading.delete(name);

            return asset;
        });

        this.loading.set(name, promise);

        const asset = await promise;

        return new AssetHandle(
            asset,
            () => this.release(name),
        );
    }

    public get<T extends Disposable>(name: string): AssetHandle<T> | undefined {
        const asset = this.assets.get(name);

        if(!asset) {
            Logger.warn('Asset "%s" not loaded', name);
            return undefined;
        }

        return new AssetHandle(
            asset as Asset<T>,
            () => this.release(name),
        );
    }

    private release(name: string): void {
        const asset = this.assets.get(name);

        if(!asset) {
            return;
        }

        if(!asset.release()) {
            return;
        }

        const resource = asset.get();

        resource.dispose();

        this.assets.delete(name);
    }

    public unload(name: string): void {
        const asset = this.assets.get(name);

        if(!asset) {
            return;
        }

        if(asset.refCount > 0) {
            Logger.warn(
                'Cannot unload asset "%s"; %d references still exist',
                name,
                asset.refCount,
            );
            return;
        }

        const resource = asset.get();

        resource.dispose();

        this.assets.delete(name);
    }

    public destroy(): void {
        for(const [name, asset] of this.assets) {
            if(asset.refCount > 0) {
                Logger.warn(
                    'Asset "%s" leaked with %d active references',
                    name,
                    asset.refCount,
                );
            }

            const resource = asset.get();

            resource.dispose();
        }

        this.assets.clear();
        this.loading.clear();
    }
}