import { Vector2d } from "../base/vector2d";
import {createBoundingBox, isOverlaping} from "../base/rectangle";

test('create boundingbox', () => 
{
  const points = [
    new Vector2d(0, 0),
    new Vector2d(2, 2),
    new Vector2d(3, 3),
    new Vector2d(4, 4),
    new Vector2d(5, 5)];

    const rectangle = createBoundingBox(points);
    expect(rectangle.bottomLeft.equals(new Vector2d(0, 0))).toBe(true);
    expect(rectangle.topRight.equals(new Vector2d(5, 5))).toBe(true);
});

test('rectangles overlaping', () =>
{
    const rect1 = {bottomLeft: new Vector2d(0, 0), topRight: new Vector2d(5, 5)};
    const rect2 = {bottomLeft: new Vector2d(4, 4), topRight: new Vector2d(6, 6)};
    const overlaping = isOverlaping(rect1, rect2);
    expect(overlaping).toBe(true);
});

test('rectangles not overlaping', () =>
{
    const rect1 = {bottomLeft: new Vector2d(0, 0), topRight: new Vector2d(5, 5)};
    const rect2 = {bottomLeft: new Vector2d(6, 6), topRight: new Vector2d(7, 7)};
    const overlaping = isOverlaping(rect1, rect2);
    expect(overlaping).toBe(false);
});