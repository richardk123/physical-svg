import {Command} from "svg-path-parser";
import {AllCommandTypes} from "../base/command_mapper";
import {SvgData} from "../base/svg_data";

export interface Physics
{
    // update aggregates shapes each frame
    update(aggregatedShapes: AllCommandTypes[][]) : void;

    // debug render physics
    debugRenderLoop(svgData: SvgData): void;
}