import {Shape} from "../base/shape/shape";
import {Command} from "svg-path-parser";

export interface Physics
{

    init(aggregatedShapes: Shape<Command>[][]): void;

    update(aggregatedShapes: Shape<Command>[][], deltaTime: number) : void;
}