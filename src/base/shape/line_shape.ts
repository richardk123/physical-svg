import {Shape} from "./shape";
import {Line} from "../command_mapper";
import {SvgData} from "../svg_data";

export class LineShape implements Shape<Line>
{
    code: 'L';
    private _line: Line
    private _svgData: SvgData;

    constructor(line: Line, svgData: SvgData)
    {
        this.code = 'L';
        this._line = line;
        this._svgData = svgData;
    }

    get svgData(): SvgData
    {
        return this._svgData;
    }

    get command(): Line {
        return this._line;
    }
}