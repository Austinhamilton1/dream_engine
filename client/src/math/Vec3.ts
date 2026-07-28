export class Vec3 {

    public static readonly Zero = new Vec3(0, 0, 0);
    public static readonly One = new Vec3(1, 1, 1);

    public static readonly Up = new Vec3(0, 1, 0);
    public static readonly Down = new Vec3(0, -1, 0);

    public static readonly Left = new Vec3(-1, 0, 0);
    public static readonly Right = new Vec3(1, 0, 0);

    public static readonly Forward = new Vec3(0, 0, -1);
    public static readonly Back = new Vec3(0, 0, 1);

    public x: number;
    public y: number;
    public z: number;

    constructor(
        x = 0,
        y = 0,
        z = 0
    ) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public clone(): Vec3 {
        return new Vec3(
            this.x,
            this.y,
            this.z
        );
    }

    public copy(v: Vec3): this {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;

        return this;
    }

    public set(
        x: number,
        y: number,
        z: number
    ): this {

        this.x = x;
        this.y = y;
        this.z = z;

        return this;
    }

    public equals(v: Vec3): boolean {
        return (
            this.x === v.x &&
            this.y === v.y &&
            this.z === v.z
        );
    }

    public get lengthSquared(): number {
        return (
            this.x * this.x +
            this.y * this.y +
            this.z * this.z
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

    public add(v: Vec3): this {

        this.x += v.x;
        this.y += v.y;
        this.z += v.z;

        return this;
    }

    public subtract(v: Vec3): this {

        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;

        return this;
    }

    public multiply(v: Vec3): this {

        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;

        return this;
    }

    public divide(v: Vec3): this {

        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;

        return this;
    }

    public scale(s: number): this {

        this.x *= s;
        this.y *= s;
        this.z *= s;

        return this;
    }

    public negate(): this {

        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;

        return this;
    }

    public dot(v: Vec3): number {

        return (
            this.x * v.x +
            this.y * v.y +
            this.z * v.z
        );
    }

    public cross(v: Vec3): this {

        const x = this.y * v.z - this.z * v.y;
        const y = this.z * v.x - this.x * v.z;
        const z = this.x * v.y - this.y * v.x;

        this.x = x;
        this.y = y;
        this.z = z;

        return this;
    }

    public distanceSquared(v: Vec3): number {

        const dx = this.x - v.x;
        const dy = this.y - v.y;
        const dz = this.z - v.z;

        return (
            dx * dx +
            dy * dy +
            dz * dz
        );
    }

    public distance(v: Vec3): number {
        return Math.sqrt(
            this.distanceSquared(v)
        );
    }

    public lerp(
        target: Vec3,
        alpha: number
    ): this {

        this.x += (target.x - this.x) * alpha;
        this.y += (target.y - this.y) * alpha;
        this.z += (target.z - this.z) * alpha;

        return this;
    }

    public toArray(
        array: Float32Array,
        offset = 0
    ): void {

        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
    }

    public fromArray(
        array: ArrayLike<number>,
        offset = 0
    ): this {

        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];

        return this;
    }

    public toString(): string {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }

    public normalized(): Vec3 {
        return this.clone().normalize();
    }

    public negated(): Vec3 {
        return this.clone().negate();
    }

    public static add(
        a: Vec3,
        b: Vec3
    ): Vec3 {
        return a.clone().add(b);
    }

    public static subtract(
        a: Vec3,
        b: Vec3
    ): Vec3 {
        return a.clone().subtract(b);
    }

    public static multiply(
        a: Vec3,
        b: Vec3
    ): Vec3 {
        return a.clone().multiply(b);
    }

    public static divide(
        a: Vec3,
        b: Vec3
    ): Vec3 {
        return a.clone().divide(b);
    }

    public static dot(
        a: Vec3,
        b: Vec3
    ): number {
        return a.dot(b);
    }

    public static lerp(
        a: Vec3,
        b: Vec3,
        alpha: number
    ): Vec3 {
        return a.clone().lerp(b, alpha);
    }

    public static cross(
        a: Vec3,
        b: Vec3
    ): Vec3 {
        return a.clone().cross(b);
    }
}