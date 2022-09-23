import {findAngle, rotatePointAroundCenterPoint} from "../base/math_utils";


test('rotatePoint 90', () =>
{
    const point = rotatePointAroundCenterPoint(0, 0, 5, 0, Math.PI / 2);

    expect(point.x).toBeCloseTo(0);
    expect(point.y).toBeCloseTo(-5);
});

test('rotatePoint -90', () =>
{
    const point = rotatePointAroundCenterPoint(0, 0, 5, 0, -Math.PI / 2);

    expect(point.x).toBeCloseTo(0);
    expect(point.y).toBeCloseTo(5);
});

test('rotatePoint 180', () =>
{
    const point = rotatePointAroundCenterPoint(0, 0, 5, 0, Math.PI);

    expect(point.x).toBeCloseTo(-5);
    expect(point.y).toBeCloseTo(0);
});
