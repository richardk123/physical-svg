import {Shape} from "./shape";
import {Line} from "../command_mapper";
import {SvgData} from "../svg_data";
import { Command } from "svg-path-parser";

export class LineShape implements Shape
{
    private _line: Line
    private _svgData: SvgData;

    constructor(line: Line, svgData: SvgData)
    {
        this._line = line;
        this._svgData = svgData;
    }

    get x()
    {
        return this._line.x;
    }

    get x0()
    {
        return this._line.x0;
    }

    get y()
    {
        return this._line.y;
    }

    get y0()
    {
        return this._line.y0;
    }

    get code(): string
    {
        return "L";
    }

    get svgData(): SvgData
    {
        return this._svgData;
    }

    get command(): Command {
        return this._line;
    }
}