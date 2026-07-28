import { Mat4 } from "./Mat4";
import { Vec3 } from "./Vec3";

export class Quaternion {
    public static readonly Identity =
        new Quaternion(0, 0, 0, 1);

    public x: number;
    public y: number;
    public z: number;
    public w: number;

    constructor(
        x = 0,
        y = 0,
        z = 0,
        w = 1
    ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    public clone(): Quaternion {
        return new Quaternion(
            this.x,
            this.y,
            this.z,
            this.w
        );
    }

    public copy(q: Quaternion): this {

        this.x = q.x;
        this.y = q.y;
        this.z = q.z;
        this.w = q.w;

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

    public identity(): this {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 1;

        return this;
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
        return Math.sqrt(
            this.lengthSquared
        );
    }

    public normalize(): this {
        const len = this.length;

        if (len > 0) {

            const inv = 1 / len;

            this.x *= inv;
            this.y *= inv;
            this.z *= inv;
            this.w *= inv;
        }

        return this;
    }

    public conjugate(): this {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;

        return this;
    }

    public inverse(): this {
        const len =
            this.lengthSquared;

        if (len === 0) {
            return this.identity();
        }

        this.conjugate();

        const inv = 1 / len;

        this.x *= inv;
        this.y *= inv;
        this.z *= inv;
        this.w *= inv;

        return this;
    }

    public multiply(
        q: Quaternion
    ): this {

        const ax = this.x;
        const ay = this.y;
        const az = this.z;
        const aw = this.w;

        const bx = q.x;
        const by = q.y;
        const bz = q.z;
        const bw = q.w;

        this.x =
            aw * bx +
            ax * bw +
            ay * bz -
            az * by;

        this.y =
            aw * by -
            ax * bz +
            ay * bw +
            az * bx;

        this.z =
            aw * bz +
            ax * by -
            ay * bx +
            az * bw;

        this.w =
            aw * bw -
            ax * bx -
            ay * by -
            az * bz;

        return this;
    }

    public dot(
        q: Quaternion
    ): number {

        return (
            this.x * q.x +
            this.y * q.y +
            this.z * q.z +
            this.w * q.w
        );
    }

    public equals(
        q: Quaternion
    ): boolean {

        return (
            this.x === q.x &&
            this.y === q.y &&
            this.z === q.z &&
            this.w === q.w
        );
    }

    public fromAxisAngle(
        axis: Vec3,
        angle: number
    ): this {
        const half =
            angle * 0.5;

        const s =
            Math.sin(half);

        this.x = axis.x * s;
        this.y = axis.y * s;
        this.z = axis.z * s;
        this.w = Math.cos(half);

        return this;
    }

    public fromEuler(
        pitch: number,
        yaw: number,
        roll: number
    ): this {
        const cy =
            Math.cos(yaw * 0.5);

        const sy =
            Math.sin(yaw * 0.5);

        const cp =
            Math.cos(pitch * 0.5);

        const sp =
            Math.sin(pitch * 0.5);

        const cr =
            Math.cos(roll * 0.5);

        const sr =
            Math.sin(roll * 0.5);

        this.w =
            cr * cp * cy +
            sr * sp * sy;

        this.x =
            sr * cp * cy -
            cr * sp * sy;

        this.y =
            cr * sp * cy +
            sr * cp * sy;

        this.z =
            cr * cp * sy -
            sr * sp * cy;

        return this;
    }

    public toMat4(): Mat4 {
        const m = new Mat4();

        const e = m.elements;

        const x = this.x;
        const y = this.y;
        const z = this.z;
        const w = this.w;

        const xx = x * x;
        const yy = y * y;
        const zz = z * z;

        const xy = x * y;
        const xz = x * z;
        const yz = y * z;

        const wx = w * x;
        const wy = w * y;
        const wz = w * z;

        e[0] = 1 - 2 * (yy + zz);
        e[1] = 2 * (xy + wz);
        e[2] = 2 * (xz - wy);
        e[3] = 0;

        e[4] = 2 * (xy - wz);
        e[5] = 1 - 2 * (xx + zz);
        e[6] = 2 * (yz + wx);
        e[7] = 0;

        e[8] = 2 * (xz + wy);
        e[9] = 2 * (yz - wx);
        e[10] = 1 - 2 * (xx + yy);
        e[11] = 0;

        e[12] = 0;
        e[13] = 0;
        e[14] = 0;
        e[15] = 1;

        return m;
    }

    public rotateVector(v: Vec3): Vec3 {
        const qx = this.x;
        const qy = this.y;
        const qz = this.z;
        const qw = this.w;

        const vx = v.x;
        const vy = v.y;
        const vz = v.z;

        // t = 2 * cross(q.xyz, v)
        const tx = 2 * (qy * vz - qz * vy);
        const ty = 2 * (qz * vx - qx * vz);
        const tz = 2 * (qx * vy - qy * vx);

        // v' = v + qw * t + cross(q.xyz, t)
        return new Vec3(
            vx +
            qw * tx +
            (qy * tz - qz * ty),

            vy +
            qw * ty +
            (qz * tx - qx * tz),

            vz +
            qw * tz +
            (qx * ty - qy * tx)
        );
    }

    public lookAt(
        eye: Vec3,
        target: Vec3,
        up: Vec3 = Vec3.Up
    ): this {

        const forward = target
            .clone()
            .subtract(eye)
            .normalize();


        const right = Vec3
            .cross(
                up,
                forward
            )
            .normalize();


        const correctedUp = Vec3
            .cross(
                forward,
                right
            );


        /*
            Rotation matrix:

            right.x   up.x   -forward.x
            right.y   up.y   -forward.y
            right.z   up.z   -forward.z

        */

        const m00 = right.x;
        const m01 = correctedUp.x;
        const m02 = -forward.x;

        const m10 = right.y;
        const m11 = correctedUp.y;
        const m12 = -forward.y;

        const m20 = right.z;
        const m21 = correctedUp.z;
        const m22 = -forward.z;


        const trace =
            m00 + m11 + m22;


        if (trace > 0) {

            const s =
                Math.sqrt(trace + 1.0) * 2;


            this.w = 0.25 * s;

            this.x =
                (m21 - m12) / s;

            this.y =
                (m02 - m20) / s;

            this.z =
                (m10 - m01) / s;

        }
        else if (
            m00 > m11 &&
            m00 > m22
        ) {

            const s =
                Math.sqrt(
                    1.0 +
                    m00 -
                    m11 -
                    m22
                ) * 2;


            this.w =
                (m21 - m12) / s;

            this.x =
                0.25 * s;

            this.y =
                (m01 + m10) / s;

            this.z =
                (m02 + m20) / s;

        }
        else if (m11 > m22) {

            const s =
                Math.sqrt(
                    1.0 +
                    m11 -
                    m00 -
                    m22
                ) * 2;


            this.w =
                (m02 - m20) / s;

            this.x =
                (m01 + m10) / s;

            this.y =
                0.25 * s;

            this.z =
                (m12 + m21) / s;

        }
        else {

            const s =
                Math.sqrt(
                    1.0 +
                    m22 -
                    m00 -
                    m11
                ) * 2;


            this.w =
                (m10 - m01) / s;

            this.x =
                (m02 + m20) / s;

            this.y =
                (m12 + m21) / s;

            this.z =
                0.25 * s;
        }


        return this.normalize();
    }

    public toString(): string {

        return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`;
    }
}