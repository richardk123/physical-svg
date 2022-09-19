import {AggregatorBuilder} from "./aggregator_builder";
import {mapAndFilterCommands} from "../base/command_mapper";
import {makeAbsolute, parseSVG} from "svg-path-parser";
import {CollisionAggregator} from "../agregator/collision/collision_aggregator";
import {DebugRenderer} from "../renderer/debug-renderer";
import {mapCommandsToShape} from "../base/shape_mapper";
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

        const paths = svg.getElementsByTagName('path');
        const pathArray = Array.prototype.slice.call(paths);

        const commands = pathArray
            .map(path =>
            {
                const commandsAbsolute = makeAbsolute(parseSVG(path.getAttribute("d")));
                const filteredCommands = mapAndFilterCommands(commandsAbsolute);
                return mapCommandsToShape(filteredCommands, new SvgData(1));
            })
            .flatMap(cmdArray => cmdArray);

        const aggregatedCommands = new CollisionAggregator().aggregate(commands);

        const renderer = new DebugRenderer(svg);

        renderer.render(0);
    }
}