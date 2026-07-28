import type { Quaternion } from "./Quaternion";
import { Vec3 } from "./Vec3";

export class Mat4 {
    private readonly _elements = new Float32Array(16);

    public constructor() {
        this.identity();
    }

    public get elements(): Float32Array {
        return this._elements;
    }

    public identity(): this {
        const e = this._elements;

        e[0] = 1; e[4] = 0; e[8]  = 0; e[12] = 0;
        e[1] = 0; e[5] = 1; e[9]  = 0; e[13] = 0;
        e[2] = 0; e[6] = 0; e[10] = 1; e[14] = 0;
        e[3] = 0; e[7] = 0; e[11] = 0; e[15] = 1;

        return this;
    }

    public clone(): Mat4 {
        const m = new Mat4();
        m.copy(this);
        return m;
    }

    public copy(other: Mat4): this {
        this._elements.set(
            other._elements
        );

        return this;
    }

    public translation(
        x: number,
        y: number,
        z: number
    ): this {
        this.identity();

        const e = this._elements;

        e[12] = x;
        e[13] = y;
        e[14] = z;

        return this;
    }

    public scaling(
        x: number,
        y: number,
        z: number
    ): this {
        this.identity();

        const e = this._elements;

        e[0] = x;
        e[5] = y;
        e[10] = z;

        return this;
    }

    public rotationX(angle: number): this {
        this.identity();

        const c = Math.cos(angle);
        const s = Math.sin(angle);

        const e = this._elements;

        e[5] = c;
        e[6] = s;

        e[9] = -s;
        e[10] = c;

        return this;
    }

    public rotationY(angle: number): this {
        this.identity();

        const c = Math.cos(angle);
        const s = Math.sin(angle);

        const e = this._elements;

        e[0] = c;
        e[2] = -s;

        e[8] = s;
        e[10] = c;

        return this;
    }

    public rotationZ(angle: number): this {
        this.identity();

        const c = Math.cos(angle);
        const s = Math.sin(angle);

        const e = this._elements;

        e[0] = c;
        e[1] = s;

        e[4] = -s;
        e[5] = c;

        return this;
    }

    public multiply(
        other: Mat4
    ): this {
        const a = this._elements;
        const b = other._elements;

        const r = new Float32Array(16);

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                let sum = 0;

                for (let i = 0; i < 4; i++) {
                    sum +=
                        a[i * 4 + row] *
                        b[col * 4 + i];
                }

                r[col * 4 + row] = sum;
            }
        }

        a.set(r);

        return this;
    }

    public transpose(): this {
        const e = this._elements;

        const swap = (
            i: number,
            j: number
        ) => {
            const t = e[i];
            e[i] = e[j];
            e[j] = t;
        };

        swap(1,4);
        swap(2,8);
        swap(3,12);

        swap(6,9);
        swap(7,13);

        swap(11,14);

        return this;
    }

    public transformPoint(v: Vec3): Vec3 {
        const e = this._elements;

        const x = v.x;
        const y = v.y;
        const z = v.z;

        const w =
            e[3] * x +
            e[7] * y +
            e[11] * z +
            e[15];

        return new Vec3(
            (
                e[0] * x +
                e[4] * y +
                e[8] * z +
                e[12]
            ) / w,

            (
                e[1] * x +
                e[5] * y +
                e[9] * z +
                e[13]
            ) / w,

            (
                e[2] * x +
                e[6] * y +
                e[10] * z +
                e[14]
            ) / w
        );
    }

    public transformDirection(v: Vec3): Vec3 {
        const e = this._elements;

        const x = v.x;
        const y = v.y;
        const z = v.z;

        return new Vec3(
            (
                e[0] * x +
                e[4] * y +
                e[8] * z
            ),

            (
                e[1] * x +
                e[5] * y +
                e[9] * z
            ),

            (
                e[2] * x +
                e[6] * y +
                e[10] * z
            )
        );
    }

    public toArray(
        array: Float32Array,
        offset = 0
    ): void {

        array.set(
            this._elements,
            offset
        );
    }

    public perspective(
        fov: number,
        aspect: number,
        near: number,
        far: number
    ): this {
        const e = this._elements;

        const f =
            1 / Math.tan(fov / 2);

        e.fill(0);

        e[0] = f / aspect;

        e[5] = f;

        e[10] =
            (far + near) /
            (near - far);

        e[11] = -1;

        e[14] =
            (2 * far * near) /
            (near - far);

        return this;
    }

    public lookAt(
        eye: Vec3,
        target: Vec3,
        up: Vec3
    ): this {

        const z =
            eye.clone()
                .subtract(target)
                .normalize();

        const x =
            Vec3.cross(
                up,
                z
            ).normalize();

        const y =
            Vec3.cross(
                z,
                x
            );

        const e = this._elements;

        e[0] = x.x;
        e[1] = y.x;
        e[2] = z.x;
        e[3] = 0;

        e[4] = x.y;
        e[5] = y.y;
        e[6] = z.y;
        e[7] = 0;

        e[8] = x.z;
        e[9] = y.z;
        e[10] = z.z;
        e[11] = 0;

        e[12] =
            -Vec3.dot(x, eye);

        e[13] =
            -Vec3.dot(y, eye);

        e[14] =
            -Vec3.dot(z, eye);

        e[15] = 1;

        return this;
    }

    public trs(
        translation: Vec3,
        rotation: Mat4,
        scale: Vec3
    ): this {

        const r = rotation.elements;
        const e = this._elements;

        // First column
        e[0] = r[0] * scale.x;
        e[1] = r[1] * scale.x;
        e[2] = r[2] * scale.x;
        e[3] = r[3] * scale.x;

        // Second column
        e[4] = r[4] * scale.y;
        e[5] = r[5] * scale.y;
        e[6] = r[6] * scale.y;
        e[7] = r[7] * scale.y;

        // Third column
        e[8] = r[8] * scale.z;
        e[9] = r[9] * scale.z;
        e[10] = r[10] * scale.z;
        e[11] = r[11] * scale.z;

        // Translation
        e[12] = translation.x;
        e[13] = translation.y;
        e[14] = translation.z;
        e[15] = 1;

        return this;
    }

    public compose(
        translation: Vec3,
        rotation: Quaternion,
        scale: Vec3,
    ): this {
        return this.trs(
            translation,
            rotation.toMat4(),
            scale,
        );
    }

    public fromArray(
        array: ArrayLike<number>,
        offset = 0
    ): this {

        for(let i = 0; i < 16; i++) {
            this._elements[i] = array[offset + i];
        }

        return this;
    }

    public toString(): string {
        const e = this._elements;

        return `
${e[0]} ${e[4]} ${e[8]} ${e[12]}
${e[1]} ${e[5]} ${e[9]} ${e[13]}
${e[2]} ${e[6]} ${e[10]} ${e[14]}
${e[3]} ${e[7]} ${e[11]} ${e[15]}
`;
    }

    public static Identity(): Mat4 {
        return new Mat4().identity();
    }

    public static Translation(
        x: number, 
        y: number, 
        z: number,
    ): Mat4 {
        return new Mat4().translation(x, y, z);
    }

    public static Scaling(
        x: number,
        y: number,
        z: number,
    ): Mat4 {
        return new Mat4().scaling(x, y, z);
    }

    public static RotationX(angle: number) {
        return new Mat4().rotationX(angle);
    }

    public static RotationY(angle: number) {
        return new Mat4().rotationY(angle);
    }

    public static RotationZ(angle: number) {
        return new Mat4().rotationZ(angle);
    }

    public static TRS(
        translation: Vec3,
        rotation: Mat4,
        scale: Vec3,
    ): Mat4 {
        return new Mat4().trs(
            translation,
            rotation,
            scale,
        );
    }
}