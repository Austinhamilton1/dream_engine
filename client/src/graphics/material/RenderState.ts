export enum BlendMode {
    None,
    Alpha,
}

export enum CullMode {
    Back,
    Front,
    FrontAndBack,
}

export class RenderState {
    public blend = BlendMode.None;
    public cull = CullMode.Back;
    public depthTest = true;
    public depthWrite = true;
}