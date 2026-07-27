import { Engine } from "./core/Engine";
import { DreamApplication } from "./DreamApplication";

const app = new DreamApplication();

const engine = new Engine(app, {
    width: 1280,
    height: 720,
    title: 'Dream Engine',
    
    clearColor: {
        r: 0.18,
        g: 0.35,
        b: 0.70,
        a: 1.0,
    }
});

await engine.initialize();

engine.run();