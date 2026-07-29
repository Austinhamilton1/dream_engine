export enum BlendMode {
    None,
    Alpha,
}

export enum CullMode {
    None,
    Back,
    Front,
}

export class RenderState {
    public blend = BlendMode.None;
    public cull = CullMode.Back;
    public depthTest = true;
    public depthWrite = true;
}