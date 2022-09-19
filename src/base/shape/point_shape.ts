import {Shape} from "./shape";
import {Command, MoveToCommandMadeAbsolute} from "svg-path-parser";
import {SvgData} from "../svg_data";

export class PointShape implements Shape
{
    private _move: MoveToCommandMadeAbsolute;
    private _svgData: SvgData;

    constructor(moveCmd: MoveToCommandMadeAbsolute, svgData: SvgData)
    {
        this._move = moveCmd;
        this._svgData = svgData;
    }

    get x(): number
    {
        return this._move.x;
    }

    get y(): number
    {
        return this._move.y;
    }

    get code(): string
    {
        return "M";
    }

    get svgData(): SvgData
    {
        return this._svgData;
    }

    get command(): Command {
        return this._move;
    }

}