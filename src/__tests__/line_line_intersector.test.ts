import {Line} from "../base/command_mapper";
import {LineLineIntersector} from "../agregator/collision/line_line_intersector";

test('parallel lines', () =>
{
    const l1 = new Line(0, 0, 5, 0);
    const l2 = new Line(0, 1, 5, 1);
    expect(new LineLineIntersector().intersects(l1, l2)).toBe(false);
});

test('perpendicular lines intersect', () =>
{
    const l1 = new Line(-5, 0, 5, 0);
    const l2 = new Line(0, -5, 5, 5);
    expect(new LineLineIntersector().intersects(l1, l2)).toBe(true);
});

test('perpendicular lines not intersect', () =>
{
    const l1 = new Line(-5, 0, 5, 0);
    const l2 = new Line(0, 1, 5, 5);
    expect(new LineLineIntersector().intersects(l1, l2)).toBe(false);
});

test('lines not intersect', () =>
{
    const l1 = new Line(0, 0, 5, 5);
    const l2 = new Line(2, 3, 3, 5);
    expect(new LineLineIntersector().intersects(l1, l2)).toBe(false);
});

test('lines intersect', () =>
{
    const l1 = new Line(0, 0, 5, 5);
    const l2 = new Line(3, 5, 5, 1);
    expect(new LineLineIntersector().intersects(l1, l2)).toBe(true);
});

test('lines intersect in one point', () =>
{
    const l1 = new Line(0, 0, 5, 0);
    const l2 = new Line(3, 0, 3, 5);
    expect(new LineLineIntersector().intersects(l1, l2)).toBe(true);
});
