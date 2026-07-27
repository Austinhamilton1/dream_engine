import { Logger } from "../core/Logger";
import { AssetLoader } from "./AssetLoader";

export class ShaderLoader extends AssetLoader<string> {
    public async load(path: string): Promise<string> {
        const cached = this.get(path);
        if(cached) return cached;

        const response = await fetch(path);

        if(!response.ok) {
            Logger.error('Unable to load shader: "%s"', path);
            throw new Error('Invalid path');
        }

        const source = await response.text();

        this.store(path, source);;

        return source;
    }
}