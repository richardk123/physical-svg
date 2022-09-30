import {MatterJsPhysics} from "../physics/matterjs_physics";
import {Renderer} from "../renderer/renderer";

export class StopPhysicalSvg
{
    private readonly _physics: MatterJsPhysics;
    private readonly _renderer: Renderer;

    constructor(physics: MatterJsPhysics, renderer: Renderer)
    {
        this._physics = physics;
        this._renderer = renderer;
    }

    public stop(): void
    {
        this._renderer.stop();
        this._physics.stop();
    }
}