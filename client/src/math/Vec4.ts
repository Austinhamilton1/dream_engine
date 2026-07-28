export class Vec4 {
    public static readonly Zero = new Vec4(0, 0, 0, 0);
    public static readonly One = new Vec4(1, 1, 1, 1);

    public x: number;
    public y: number;
    public z: number;
    public w: number;

    constructor(
        x = 0,
        y = 0,
        z = 0,
        w = 0
    ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    public clone(): Vec4 {
        return new Vec4(
            this.x,
            this.y,
            this.z,
            this.w
        );
    }

    public copy(v: Vec4): this {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        this.w = v.w;

        return this;
    }

    public set(
        x: number,
        y: number,
        z: number,
        w: number
    ): this {

        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;

        return this;
    }

    public equals(v: Vec4): boolean {
        return (
            this.x === v.x &&
            this.y === v.y &&
            this.z === v.z &&
            this.w === v.w
        );
    }

    public get lengthSquared(): number {
        return (
            this.x * this.x +
            this.y * this.y +
            this.z * this.z +
            this.w * this.w
        );
    }

    public get length(): number {
        return Math.sqrt(this.lengthSquared);
    }

    public normalize(): this {

        const len = this.length;

        if (len > 0) {
            this.scale(1 / len);
        }

        return this;
    }

    public add(v: Vec4): this {

        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        this.w += v.w;

        return this;
    }

    public subtract(v: Vec4): this {

        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        this.w -= v.w;

        return this;
    }

    public multiply(v: Vec4): this {

        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        this.w *= v.w;

        return this;
    }

    public divide(v: Vec4): this {

        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        this.w /= v.w;

        return this;
    }

    public scale(s: number): this {

        this.x *= s;
        this.y *= s;
        this.z *= s;
        this.w *= s;

        return this;
    }

    public negate(): this {

        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        this.w = -this.w;

        return this;
    }

    public dot(v: Vec4): number {

        return (
            this.x * v.x +
            this.y * v.y +
            this.z * v.z +
            this.w * v.w
        );
    }

    public distanceSquared(v: Vec4): number {

        const dx = this.x - v.x;
        const dy = this.y - v.y;
        const dz = this.z - v.z;
        const dw = this.w - v.w;

        return (
            dx * dx +
            dy * dy +
            dz * dz +
            dw * dw
        );
    }

    public distance(v: Vec4): number {
        return Math.sqrt(
            this.distanceSquared(v)
        );
    }

    public lerp(
        target: Vec4,
        alpha: number
    ): this {

        this.x += (target.x - this.x) * alpha;
        this.y += (target.y - this.y) * alpha;
        this.z += (target.z - this.z) * alpha;
        this.w += (target.w - this.w) * alpha;

        return this;
    }

    public toArray(
        array: Float32Array,
        offset = 0
    ): void {

        array[offset] = this.x;
        array[offset + 1] = this.y;
        array[offset + 2] = this.z;
        array[offset + 3] = this.w;
    }

    public fromArray(
        array: ArrayLike<number>,
        offset = 0
    ): this {

        this.x = array[offset];
        this.y = array[offset + 1];
        this.z = array[offset + 2];
        this.w = array[offset + 3];

        return this;
    }

    public toString(): string {
        return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
    }

    public normalized(): Vec4 {
        return this.clone().normalize();
    }

    public negated(): Vec4 {
        return this.clone().negate();
    }

    public static add(
        a: Vec4,
        b: Vec4
    ): Vec4 {
        return a.clone().add(b);
    }

    public static subtract(
        a: Vec4,
        b: Vec4
    ): Vec4 {
        return a.clone().subtract(b);
    }

    public static multiply(
        a: Vec4,
        b: Vec4
    ): Vec4 {
        return a.clone().multiply(b);
    }

    public static divide(
        a: Vec4,
        b: Vec4
    ): Vec4 {
        return a.clone().divide(b);
    }

    public static dot(
        a: Vec4,
        b: Vec4
    ): number {
        return a.dot(b);
    }

    public static lerp(
        a: Vec4,
        b: Vec4,
        alpha: number
    ): Vec4 {
        return a.clone().lerp(b, alpha);
    }
}