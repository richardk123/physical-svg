import {Shape} from "./shape";
import {MoveToCommandMadeAbsolute} from "svg-path-parser";
import {SvgData} from "../svg_data";

export class PointShape implements Shape<MoveToCommandMadeAbsolute>
{
    code: 'M';
    private _move: MoveToCommandMadeAbsolute;
    private _svgData: SvgData;

    constructor(moveCmd: MoveToCommandMadeAbsolute, svgData: SvgData)
    {
        this.code = 'M';
        this._move = moveCmd;
        this._svgData = svgData;
    }

    get svgData(): SvgData
    {
        return this._svgData;
    }

    get command(): MoveToCommandMadeAbsolute {
        return this._move;
    }

}