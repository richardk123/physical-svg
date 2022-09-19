import {Shape} from "./shape";
import {Command, CurveToCommandMadeAbsolute} from "svg-path-parser";
import {SvgData} from "../svg_data";
import {Line} from "../command_mapper";

export class CurveShape implements Shape<CurveToCommandMadeAbsolute>
{
    code: 'C';
    private _curve: CurveToCommandMadeAbsolute
    private _svgData: SvgData;

    constructor(curve: CurveToCommandMadeAbsolute, svgData: SvgData)
    {
        this.code = 'C';
        this._curve = curve;
        this._svgData = svgData;
    }

    get command(): CurveToCommandMadeAbsolute
    {
        return this._curve;
    }

    get svgData(): SvgData
    {
        return this.svgData;
    }

}