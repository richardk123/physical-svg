import {createCurve} from "./line_curve_intersector.test";
import {PointShape} from "../base/shape/point_shape";
import {MoveToCommandMadeAbsolute} from "svg-path-parser";
import {SvgData} from "../base/svg_data";
import {CurvePointIntersector} from "../agregator/collision/curve_point_intersector";

test('curve point does intersect', () =>
{
    const point = createPoint(10, 80);
    const curve = createCurve(10, 80, 40, 10, 65, 10, 95, 80);

    expect(new CurvePointIntersector().intersects(curve, point)).toBe(true);
});

test('curve point does not intersect', () =>
{
    const point = createPoint(50, 80);
    const curve = createCurve(10, 80, 40, 10, 65, 10, 95, 80);

    expect(new CurvePointIntersector().intersects(curve, point)).toBe(false);
});

const createPoint = (x: number, y: number): PointShape =>
{
    return new PointShape(new Move(x, y), new SvgData(1));
}

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
