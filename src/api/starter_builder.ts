import {AggregatorBuilder} from "./aggregator_builder";
import {expandCommands} from "../base/command_mapper";
import {makeAbsolute, parseSVG} from "svg-path-parser";
import {DebugRenderer} from "../renderer/debug-renderer";
import {mapCommandsToShape} from "../base/shape/shape_mapper";
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

        const allCommands = pathCommandArray
            .flatMap(commands => commands);

        const svgData = new SvgData(svg);
        const shapes = mapCommandsToShape(allCommands, svgData);
        const aggregatedShapes = this._aggregatorBuilder._aggregator.aggregate(shapes);

        const renderer = new DebugRenderer(svgData, pathCommandArray, aggregatedShapes);
        renderer.render(0);
    }
}