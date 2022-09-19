import {Shape} from "../base/shape/shape";
import {Command} from "svg-path-parser";

export interface Aggregator
{
    /**
     * aggregate commands that belongs together
     */
    aggregate(shapes: Shape<Command>[]): Shape<Command>[][]
}