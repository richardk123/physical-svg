import {MoveToCommandMadeAbsolute} from "svg-path-parser";
import {SvgData} from "../base/svg_data";
import {CurvePointIntersector} from "../agregator/collision/curve_point_intersector";
import {Curve} from "./line_curve_intersector.test";

test('curve point does intersect', () =>
{
    const point = new Move(10, 80);
    const curve = new Curve(10, 80, 40, 10, 65, 10, 95, 80);

    expect(new CurvePointIntersector().intersects(curve, point)).toBe(true);
});

test('curve point does not intersect', () =>
{
    const point = new Move(50, 80);
    const curve = new Curve(10, 80, 40, 10, 65, 10, 95, 80);

    expect(new CurvePointIntersector().intersects(curve, point)).toBe(false);
});

export class Move implements MoveToCommandMadeAbsolute
{
    code: 'M';
    command: "moveto";
    relative: false;
    x: number;
    y: number;
    x0: number;
    y0: number;

    constructor(x: number, y: number)
    {
        this.code = 'M';
        this.command = "moveto";
        this.relative = false;
        this.x = x;
        this.y = y;
        this.x0 = 0;
        this.y0 = 0;
    }

}
