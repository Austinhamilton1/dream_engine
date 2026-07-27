export class Timer {
    public static deltaTime = 0;
    public static elapsedTime = 0;

    public static fps = 0;
    public static frame = 0;

    private static lastTime = 0;

    private static fpsTimer = 0;
    private static fpsFrames = 0;

    public static initialize(): void {
        this.lastTime = performance.now();
    }

    public static update(): void {
        const now = performance.now();

        this.deltaTime = (now - this.lastTime) / 1000;

        this.elapsedTime += this.deltaTime;

        this.frame++;

        this.lastTime = now;

        this.fpsTimer += this.deltaTime;
        this.fpsFrames++;

        if (this.fpsTimer >= 1.0) {
            this.fps = this.fpsFrames;

            this.fpsFrames = 0;
            this.fpsTimer = 0;
        }
    }

}