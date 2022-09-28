import {AggregatorBuilder} from "./aggregator_builder";
import {BodyConfig} from "../physics/matterjs/body/body_config";
import {MatterJsPhysics} from "../physics/matterjs_physics";
import {SvgData} from "../base/svg_data";
import {expandCommands} from "../base/command_mapper";
import {makeAbsolute, parseSVG} from "svg-path-parser";
import {Aggregator} from "../agregator/aggregator";
import {RenderBuilder} from "./render_builder";
import {Vector} from "matter-js";

export class PhysicBuilder
{
    private readonly _aggregator: Aggregator;
    private readonly _svg: HTMLElement;

    constructor(aggregator: Aggregator, svg: HTMLElement)
    {
        this._aggregator = aggregator;
        this._svg = svg;
    }

    public fallSimulation(config: BodyConfig, gravity?: { x: number, y: number }): RenderBuilder
    {
        const svgData = this.createSvgData();
        const physics = new MatterJsPhysics(svgData, config, gravity);
        return new RenderBuilder(physics, svgData);
    }

    private createSvgData(): SvgData
    {
        const paths = Array.prototype.slice.call(this._svg.getElementsByTagName('path'));

        const pathCommandArray = paths
            .map(path => path.getAttribute("d"))
            .map(pathString => expandCommands(makeAbsolute(parseSVG(pathString))));

        const aggregatedCommands = this._aggregator.aggregate(pathCommandArray);

        return new SvgData(this._svg, pathCommandArray, aggregatedCommands);
    }
}