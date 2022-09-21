import {Shape} from "./shape";
import {Line} from "../command_mapper";
import {SvgData} from "../svg_data";
import {Vector2d} from "../vector2d";

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

        const Vx = cmd.x - cmd.x0;
        const Vy = cmd.y - cmd.y0;

        let radians;

        if (Vx || Vy)
        {
            radians = Math.atan2(Vy, Vx) - Math.PI;
        } else
        {
            radians = 0;
        }

        if (radians < 0) {
            radians += 2*Math.PI;
        }
        return radians
    }

    public findLength(): number
    {
        return new Vector2d(this.command.x, this.command.y).distance(new Vector2d(this.command.x0, this.command.y0));
    }
}