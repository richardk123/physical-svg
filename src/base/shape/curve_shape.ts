import {Shape} from "./shape";
import {
    CurveToCommandMadeAbsolute,
    QuadraticCurveToCommandMadeAbsolute,
    SmoothCurveToCommandMadeAbsolute
} from "svg-path-parser";
import {SvgData} from "../svg_data";
import {Bezier} from "bezier-js";

export class CurveShape implements Shape<CurveToCommandMadeAbsolute | SmoothCurveToCommandMadeAbsolute | QuadraticCurveToCommandMadeAbsolute>
{
    code: 'C';
    private _curve: CurveToCommandMadeAbsolute | SmoothCurveToCommandMadeAbsolute | QuadraticCurveToCommandMadeAbsolute;
    private _svgData: SvgData;

    constructor(curve: CurveToCommandMadeAbsolute | SmoothCurveToCommandMadeAbsolute | QuadraticCurveToCommandMadeAbsolute, svgData: SvgData)
    {
        this.code = 'C';
        this._curve = curve;
        this._svgData = svgData;
    }

    get command(): CurveToCommandMadeAbsolute | SmoothCurveToCommandMadeAbsolute | QuadraticCurveToCommandMadeAbsolute
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

    get curvePoints(): {x: number, y: number}[]
    {
        switch (this.command.code)
        {
            case 'C':
            {
                return [
                    {x: this.command.x0, y: this.command.y0},
                    {x: this.command.x1, y: this.command.y1},
                    {x: this.command.x2, y: this.command.y2},
                    {x: this.command.x, y: this.command.y},
                ];
            }
            case 'Q':
            {
                return [
                    {x: this.command.x0, y: this.command.y0},
                    {x: this.command.x1, y: this.command.y1},
                    {x: this.command.x, y: this.command.y},
                ];
            }
            case "S":
            {
                return [
                    {x: this.command.x0, y: this.command.y0},
                    {x: this.command.x2, y: this.command.y2},
                    {x: this.command.x, y: this.command.y},
                ];
            }
        }
    }

    get bezier(): Bezier
    {
        return new Bezier(this.curvePoints);
    }

}