import {Shape} from "./shape";
import {Line} from "../command_mapper";
import {SvgData} from "../svg_data";
import {findAngle, findDistance} from "../math_utils";

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

    get center(): { x: number, y: number }
    {
        const cmd = this.command;
        return {x: (cmd.x0 + cmd.x) / 2, y: (cmd.y + cmd.y0) / 2};
    }

    public findAngle(): number
    {
        const cmd = this.command;
        return findAngle(cmd.x, cmd.y, cmd.x0, cmd.y0);
    }

    public findLength(): number
    {
        return findDistance(this.command.x, this.command.y, this.command.x0, this.command.y0);
    }
}