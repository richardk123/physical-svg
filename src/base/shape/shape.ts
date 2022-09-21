import {SvgData} from "../svg_data";
import {Command} from "svg-path-parser";

export interface Shape<T extends Command>
{
    code: 'M' | 'L' | 'C';

    get svgData(): SvgData

    get command(): T;

    // center point of the shape
    get center(): {x: number, y: number};
}