import {Command} from "svg-path-parser";
import {AllCommandTypes} from "../base/command_mapper";

export interface Physics
{

    update(aggregatedShapes: AllCommandTypes[][], deltaTime: number) : void;
}