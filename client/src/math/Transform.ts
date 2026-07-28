import { Mat4 } from "./Mat4";
import { Quaternion } from "./Quaternion";
import { Vec3 } from "./Vec3";

export class Transform {
    private readonly _position = new Vec3();
    private readonly _rotation = new Quaternion();
    private readonly _scale = Vec3.One;

    private readonly _matrix = new Mat4();
    private dirty = true;

    public get matrix(): Mat4 {
        if(!this.dirty) {
            this._matrix.compose(
                this._position,
                this._rotation,
                this._scale,
            );

            this.dirty = false;
        }

        return this._matrix;
    }

    public get position(): Readonly<Vec3> {
        return this._position;
    }

    public get rotation(): Readonly<Quaternion> {
        return this._rotation;
    }

    public get scale(): Readonly<Vec3> {
        return this._scale;
    }

    public translate(delta: Vec3): this {
        this._position.add(delta);
        this.dirty = true;
        return this;
    }

    public rotate(rotation: Quaternion): this {
        this._rotation.multiply(rotation);
        this.dirty = true;
        return this;
    }

    public setPosition(
        x: number,
        y: number,
        z: number,
    ): this {
        this._position.set(x, y, z);
        this.dirty = true;
        return this;
    }

    public setScale(
        x: number,
        y: number,
        z: number,
    ): this {
        this._scale.set(x, y, z);
        this.dirty = true;
        return this;
    }

    public lookAt(target: Vec3): this {
        this._rotation.lookAt(
            this.position,
            target,
            Vec3.Up,
        );
        return this;
    }

    public clone(): Transform {
        const t = new Transform();

        t._position.copy(this._position);
        t._rotation.copy(this._rotation);
        t._scale.copy(this._scale);

        return t;
    }
}