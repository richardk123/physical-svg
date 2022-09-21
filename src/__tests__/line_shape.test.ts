import {createLine} from "./line_line_intersector.test";

test('line center', () =>
{
    const lineShape = createLine(0, 0, 5, 5);
    expect(lineShape.center.x).toBe(2.5);
    expect(lineShape.center.y).toBe(2.5);
});


test('line angle 0', () =>
{
    const lineShape = createLine(0, 0, 5, 0);
    expect(lineShape.findAngle()).toBeCloseTo(0);
});

test('line angle 90', () =>
{
    const lineShape = createLine(0, 0, 0, 5);
    expect(lineShape.findAngle()).toBeCloseTo(Math.PI / 2);
});

test('line angle 180', () =>
{
    const lineShape = createLine(0, 0, -5, 0);
    expect(lineShape.findAngle()).toBeCloseTo(Math.PI);
});

test('line angle 270', () =>
{
    const lineShape = createLine(0, 0, 0, -5);
    expect(lineShape.findAngle()).toBeCloseTo(Math.PI + Math.PI / 2);
});

test('line angle 45', () =>
{
    const lineShape = createLine(0, 0, 5, 5);
    expect(lineShape.findAngle()).toBeCloseTo(Math.PI / 4);
});

test('line length', () =>
{
    const lineShape = createLine(0, 0, 0, 5);
    expect(lineShape.findLength()).toBe(5);
});

