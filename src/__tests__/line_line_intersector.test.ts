import {Line} from "../base/command_mapper";
import {LineShape} from "../base/shape/line_shape";
import {SvgData} from "../base/svg_data";
import {LineLineIntersector} from "../agregator/collision/line_line_intersector";

test('parallel lines', () =>
{
    const l1 = createLine(0, 0, 5, 0);
    const l2 = createLine(0, 1, 5, 1);
    expect(new LineLineIntersector().intersects(l1, l2)).toBe(false);
});

test('perpendicular lines intersect', () =>
{
    const l1 = createLine(-5, 0, 5, 0);
    const l2 = createLine(0, -5, 5, 5);
    expect(new LineLineIntersector().intersects(l1, l2)).toBe(true);
});

test('perpendicular lines not intersect', () =>
{
    const l1 = createLine(-5, 0, 5, 0);
    const l2 = createLine(0, 1, 5, 5);
    expect(new LineLineIntersector().intersects(l1, l2)).toBe(false);
});

test('lines not intersect', () =>
{
    const l1 = createLine(0, 0, 5, 5);
    const l2 = createLine(2, 3, 3, 5);
    expect(new LineLineIntersector().intersects(l1, l2)).toBe(false);
});

test('lines intersect', () =>
{
    const l1 = createLine(0, 0, 5, 5);
    const l2 = createLine(3, 5, 5, 1);
    expect(new LineLineIntersector().intersects(l1, l2)).toBe(true);
});

test('lines intersect in one point', () =>
{
    const l1 = createLine(0, 0, 5, 0);
    const l2 = createLine(3, 0, 3, 5);
    expect(new LineLineIntersector().intersects(l1, l2)).toBe(true);
});

export const createLine = (x: number, y: number, x0: number, y0: number) =>
{
    return new LineShape(new Line(x, y, x0, y0), new SvgData(1));
}
