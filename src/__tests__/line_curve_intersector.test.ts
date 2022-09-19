import {LineCurveIntersector} from "../agregator/collision/line_curve_intersector";
import {createLine} from "./line_line_intersector.test";
import {SvgData} from "../base/svg_data";
import {CurveShape} from "../base/shape/curve_shape";
import {CurveToCommandMadeAbsolute} from "svg-path-parser";

test('curve line intersect in start point', () =>
{
    const line = createLine(70, 10, 0, 0);
    const curve = createCurve(70, 10, 70, 20, 110, 20, 110, 10);

    expect(new LineCurveIntersector().intersects(curve, line)).toBe(true);
});

test('curve line intersect in end point', () =>
{
    const line = createLine(110, 10, 110, 0);
    const curve = createCurve(70, 10, 70, 20, 110, 20, 110, 10);

    expect(new LineCurveIntersector().intersects(curve, line)).toBe(true);
});

test('curve line intersect in middle', () =>
{
    const line = createLine(90, 0, 90, 20);
    const curve = createCurve(70, 10, 70, 20, 110, 20, 110, 10);

    expect(new LineCurveIntersector().intersects(curve, line)).toBe(true);
});

export const createCurve = (x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x: number, y: number): CurveShape =>
{
    return new CurveShape(new Curve(x0, y0, x1, y1, x2, y2, x, y), new SvgData(1));
}

export class Curve implements CurveToCommandMadeAbsolute
{
    code: 'C';
    command: "curveto";
    relative: false;
    x: number;
    x0: number;
    x1: number;
    x2: number;
    y: number;
    y0: number;
    y1: number;
    y2: number;

    constructor(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number, x: number, y: number)
    {
        this.code = 'C';
        this.command = "curveto";
        this.relative = false;
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x = x;
        this.y = y;
    }
}
