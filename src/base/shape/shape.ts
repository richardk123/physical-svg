import {SvgData} from "../svg_data";
import {Command} from "svg-path-parser";

export interface Shape
{
    get code(): string;

    get svgData(): SvgData

    get command(): Command;
}