export class Vec2 {

    public static readonly Zero = new Vec2(0, 0);
    public static readonly One = new Vec2(1, 1);

    public static readonly Up = new Vec2(0, 1);
    public static readonly Down = new Vec2(0, -1);

    public static readonly Left = new Vec2(-1, 0);
    public static readonly Right = new Vec2(1, 0);

    public x: number;
    public y: number;

    constructor(
        x = 0,
        y = 0,
    ) {
        this.x = x;
        this.y = y;
    }

    public clone(): Vec2 {
        return new Vec2(
            this.x,
            this.y,
        );
    }

    public copy(v: Vec2): this {
        this.x = v.x;
        this.y = v.y;

        return this;
    }

    public set(
        x: number,
        y: number,
    ): this {

        this.x = x;
        this.y = y;

        return this;
    }

    public equals(v: Vec2): boolean {
        return (
            this.x === v.x &&
            this.y === v.y
        );
    }

    public get lengthSquared(): number {
        return (
            this.x * this.x +
            this.y * this.y
        );
    }

    public get length(): number {
        return Math.sqrt(
            this.lengthSquared
        );
    }

    public normalize(): this {

        const len = this.length;

        if (len > 0) {
            this.scale(1 / len);
        }

        return this;
    }

    public add(v: Vec2): this {

        this.x += v.x;
        this.y += v.y;

        return this;
    }

    public subtract(v: Vec2): this {

        this.x -= v.x;
        this.y -= v.y;

        return this;
    }

    public multiply(v: Vec2): this {

        this.x *= v.x;
        this.y *= v.y;

        return this;
    }

    public divide(v: Vec2): this {

        this.x /= v.x;
        this.y /= v.y;

        return this;
    }

    public scale(s: number): this {

        this.x *= s;
        this.y *= s;

        return this;
    }

    public negate(): this {

        this.x = -this.x;
        this.y = -this.y;

        return this;
    }

    public dot(v: Vec2): number {

        return (
            this.x * v.x +
            this.y * v.y
        );
    }

    public distanceSquared(v: Vec2): number {

        const dx = this.x - v.x;
        const dy = this.y - v.y;

        return (
            dx * dx +
            dy * dy
        );
    }

    public distance(v: Vec2): number {
        return Math.sqrt(
            this.distanceSquared(v)
        );
    }

    public lerp(
        target: Vec2,
        alpha: number
    ): this {

        this.x += (target.x - this.x) * alpha;
        this.y += (target.y - this.y) * alpha;

        return this;
    }

    public toArray(
        array: Float32Array,
        offset = 0
    ): void {

        array[offset] = this.x;
        array[offset + 1] = this.y;
    }

    public fromArray(
        array: ArrayLike<number>,
        offset = 0
    ): this {

        this.x = array[offset];
        this.y = array[offset + 1];

        return this;
    }

    public toString(): string {
        return `(${this.x}, ${this.y})`;
    }
    
    public normalized(): Vec2 {
        return this.clone().normalize();
    }

    public negated(): Vec2 {
        return this.clone().negate();
    }

    public static add(
        a: Vec2,
        b: Vec2
    ): Vec2 {
        return a.clone().add(b);
    }

    public static subtract(
        a: Vec2,
        b: Vec2
    ): Vec2 {
        return a.clone().subtract(b);
    }

    public static multiply(
        a: Vec2,
        b: Vec2
    ): Vec2 {
        return a.clone().multiply(b);
    }

    public static divide(
        a: Vec2,
        b: Vec2
    ): Vec2 {
        return a.clone().divide(b);
    }

    public static dot(
        a: Vec2,
        b: Vec2
    ): number {
        return a.dot(b);
    }

    public static lerp(
        a: Vec2,
        b: Vec2,
        alpha: number
    ): Vec2 {
        return a.clone().lerp(b, alpha);
    }
}