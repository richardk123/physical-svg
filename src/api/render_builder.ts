import {AggregatorBuilder} from "./aggregator_builder";
import {DebugRenderer} from "../renderer/debug_renderer";
import {ProductionRenderer} from "../renderer/production_renderer";
import {MatterJsPhysics} from "../physics/matterjs_physics";
import {SvgData} from "../base/svg_data";

export class RenderBuilder
{
    private readonly _physics: MatterJsPhysics;
    private readonly _svgData: SvgData;

    constructor(physics: MatterJsPhysics, svgData: SvgData)
    {
        this._physics = physics;
        this._svgData = svgData;
    }

    startDebug(): void
    {
        const renderer = new DebugRenderer();
        renderer.renderLoop(this._svgData, this._physics);
    }

    startProduction(): void
    {
        const renderer = new ProductionRenderer();
        renderer.renderLoop(this._svgData, this._physics);
    }
}