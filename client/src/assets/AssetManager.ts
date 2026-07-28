import { Logger } from "../core/Logger";
import type { GPUResource } from "../graphics/gpu/GPUResource";
import type { AssetLoader } from "./AssetLoader";

export class AssetManager {
    private readonly assets = new Map<string, unknown>();
    private readonly loading = new Map<string, Promise<unknown>>();

    public async load<T>(
        name: string,
        loader: AssetLoader<T>
    ): Promise<T> {
        if(this.assets.has(name)) {
            return this.assets.get(name) as T;
        }

        if(this.loading.has(name)) {
            return this.loading.get(name) as Promise<T>;
        }

        const promise = loader.load();
        this.loading.set(name, promise);

        const asset = await promise;
        this.assets.set(name, asset);
        this.loading.delete(name);
        
        return asset;
    }

    public get<T>(name: string): T | undefined {
        const asset = this.assets.get(name);

        if(!asset) {
            Logger.warn('Asset "%s" not loaded', name);
            return undefined;
        }

        return asset as T;
    }

    public unload(name: string): void {
        const asset = this.assets.get(name);
        if(!asset) return;

        if(
            typeof asset === 'object' &&
            asset !== null &&
            'destroy' in asset
        ) {
            (asset as GPUResource).destroy();
        }

        this.assets.delete(name);
    }

    public destroy(): void {
        for(const key of this.assets.keys()) {
            this.unload(key);
        }
    }
}