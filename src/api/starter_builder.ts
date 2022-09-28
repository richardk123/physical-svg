import {AggregatorBuilder} from "./aggregator_builder";
import {expandCommands} from "../base/command_mapper";
import {makeAbsolute, parseSVG} from "svg-path-parser";
import {DebugRenderer} from "../renderer/debug-renderer";
import {SvgData} from "../base/svg_data";

export class StarterBuilder
{
    _aggregatorBuilder: AggregatorBuilder;

    constructor(aggregatorBuilder: AggregatorBuilder)
    {
        this._aggregatorBuilder = aggregatorBuilder;
    }

    start(): void
    {
        const svg = this._aggregatorBuilder._svg;
        const paths = Array.prototype.slice.call(svg.getElementsByTagName('path'));

        const pathCommandArray = paths
            .map(path => path.getAttribute("d"))
            .map(pathString => expandCommands(makeAbsolute(parseSVG(pathString))));

        const svgData = new SvgData(svg);
        const aggregatedCommands = this._aggregatorBuilder._aggregator.aggregate(pathCommandArray);

        const renderer = new DebugRenderer(svgData, pathCommandArray, aggregatedCommands);
        renderer.render(0);
    }
}