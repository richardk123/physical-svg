import {Shape} from "../base/shape/shape";
import {Command} from "svg-path-parser";

export interface Physics
{
    update(aggregatedShapes: Shape<Command>[][]) : void;
}