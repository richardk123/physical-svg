import {Shape} from "./shape";
import {Command, CurveToCommandMadeAbsolute} from "svg-path-parser";
import {SvgData} from "../svg_data";
import {Line} from "../command_mapper";
import {Bezier} from "bezier-js";
import { findAngle } from "../math_utils";
import {Vector2d} from "../vector2d";

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
        return this._svgData;
    }

    get center(): { x: number, y: number }
    {
        const mid = this.bezier.get(0.5);
        return {x: mid.x, y: mid.y};
    }

    // angle of whole curve
    public findAngle(): number
    {
        const cmd = this.command;
        return findAngle(cmd.x0, cmd.y0, cmd.x, cmd.y);
    }

    public findBezierPointAngle(): number
    {
        const cmd = this.command;
        return findAngle(cmd.x, cmd.y, cmd.x1, cmd.y1);
    }

    public findBezierPointDistance(): number
    {
        const cmd = this.command;
        return new Vector2d(cmd.x, cmd.y).distance(new Vector2d(cmd.x1, cmd.y1));
    }

    public findLength(): number
    {
        return new Vector2d(this.command.x, this.command.y).distance(new Vector2d(this.command.x0, this.command.y0));
    }

    get bezier(): Bezier
    {
        const points = [
            {x: this.command.x0, y: this.command.y0},
            {x: this.command.x1, y: this.command.y1},
            {x: this.command.x2, y: this.command.y2},
            {x: this.command.x,  y: this.command.y},
        ];
        return new Bezier(points);
    }

}