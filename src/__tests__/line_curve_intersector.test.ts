import {LineCurveIntersector} from "../agregator/collision/line_curve_intersector";
import {CurveToCommandMadeAbsolute} from "svg-path-parser";
import {Line} from "../base/command_mapper";

test('curve line intersect in start point', () =>
{
    const line = new Line(70, 10, 0, 0);
    const curve = new Curve(70, 10, 70, 20, 110, 20, 110, 10);

    expect(new LineCurveIntersector().intersects(curve, line)).toBe(true);
});

test('curve line intersect in end point', () =>
{
    const line = new Line(110, 10, 110, 0);
    const curve = new Curve(70, 10, 70, 20, 110, 20, 110, 10);

    expect(new LineCurveIntersector().intersects(curve, line)).toBe(true);
});

test('curve line intersect in middle', () =>
{
    const line = new Line(90, 0, 90, 20);
    const curve = new Curve(70, 10, 70, 20, 110, 20, 110, 10);

    expect(new LineCurveIntersector().intersects(curve, line)).toBe(true);
});

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
