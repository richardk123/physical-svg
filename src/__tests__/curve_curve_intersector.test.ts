import {createCurve} from "./line_curve_intersector.test";
import {CurveCurveIntersector} from "../agregator/collision/curve_curve_intersector";

test('curve curve intersect in middle', () =>
{
    const curve1 = createCurve(90, 0, 80, 0, 80, 110, 90, 110);
    const curve2 = createCurve(70, 10, 70, 20, 110, 20, 110, 10);

    expect(new CurveCurveIntersector().intersects(curve1, curve2)).toBe(true);
});

test('curve curve does not intersect', () =>
{
    const curve1 = createCurve(70, 30, 70, 50, 110, 50, 110, 30);
    const curve2 = createCurve(70, 10, 70, 20, 110, 20, 110, 10);

    expect(new CurveCurveIntersector().intersects(curve1, curve2)).toBe(false);
});