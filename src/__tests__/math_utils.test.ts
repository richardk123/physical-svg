import {
    findCenterOfLine,
    findDistance, findDistanceVec,
    multiplyVec,
    rotatePointAroundCenterPoint,
    vectorEquals
} from "../base/math_utils";
import {Vector} from "matter-js";


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

test('find distance', () =>
{
    const distance = findDistance(0, 0, 5, 0);

    expect(distance).toBeCloseTo(5);
});

test('find distance from two vectors', () =>
{
    const p1 = Vector.create(5, 20);
    const p2 = Vector.create(10, 20);
    const distance = findDistanceVec(p1, p2);

    expect(distance).toBeCloseTo(5);
});

test('find center of line', () =>
{
    const p1 = Vector.create(0, 0);
    const p2 = Vector.create(10, 10);
    const c = findCenterOfLine(p1, p2);

    expect(c.x).toBeCloseTo(5);
    expect(c.y).toBeCloseTo(5);
});

test('multiply two vectors', () =>
{
    const vec = multiplyVec(Vector.create(20, 20), Vector.create(10, 20));

    expect(vec.x).toBeCloseTo(200);
    expect(vec.y).toBeCloseTo(400);
});

test('vector equals', () =>
{
    const equal = vectorEquals(Vector.create(10, 20), Vector.create(10, 20));

    expect(equal).toBe(true);
});

