import {Aggregator} from "./aggregator";
import {Command} from "svg-path-parser";
import {Shape} from "../base/shape/shape";

export class NoAggregator implements Aggregator
{
    aggregate(shapes: Shape[]): Shape[][]
    {
        return shapes.map(shape => [shape]);
    }

}