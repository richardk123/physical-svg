import { findAngle, Vector2d } from "../base/vector2d";

test('create vector', () => 
{
  const vector = new Vector2d(1, 2);
  expect(vector.x).toBe(1);
  expect(vector.y).toBe(2);
});

test('vector unit', () => 
{
  const vector = new Vector2d(2, 2).unit();
  expect(vector.x).toBeCloseTo(0.7071);
  expect(vector.y).toBeCloseTo(0.7071);
});

test('vector opposite', () => 
{
  const vector = new Vector2d(2, 2).opposite();
  expect(vector.x).toBe(-2);
  expect(vector.y).toBe(-2);
});

test('vector multiply', () => 
{
  const vector = new Vector2d(2, 3).multiply(2);
  expect(vector.x).toBe(4);
  expect(vector.y).toBe(6);
});

test('vector divide', () => 
{
  const vector = new Vector2d(2, 3).divide(2);
  expect(vector.x).toBe(1);
  expect(vector.y).toBe(1.5);
});

test('vector add', () => 
{
  const vector = new Vector2d(2, 3).add(new Vector2d(4, 5));
  expect(vector.x).toBe(6);
  expect(vector.y).toBe(8);
});

test('vector deduct', () => 
{
  const vector = new Vector2d(2, 3).deduct(new Vector2d(4, 5));
  expect(vector.x).toBe(-2);
  expect(vector.y).toBe(-2);
});

test('vector equals true', () => 
{
  const equals = new Vector2d(2, 3).equals(new Vector2d(2, 3));
  expect(equals).toBe(true);
});

test('vector equals false', () => 
{
  const equals = new Vector2d(2, 3).equals(new Vector2d(4, 5));
  expect(equals).toBe(false);
});

test('vector length', () => 
{
  const length = new Vector2d(2, 2).length();
  expect(length).toBeCloseTo(2.8284);
});

test('vector distance', () => 
{
  const distance = new Vector2d(0, 0).distance(new Vector2d(10, 0));
  expect(distance).toBe(10);
});

test('vector crossProduct', () => 
{
  const distance = new Vector2d(1, 2).crossProduct(new Vector2d(3, 4));
  expect(distance).toBe(-2);
});

test('vector toString', () => 
{
  const stringRepresentation = new Vector2d(1, 2).toString();
  expect(stringRepresentation).toBe("1_2");
});

test('vector toString', () => 
{
  const vector = Vector2d.fromString("1_2");
  expect(vector.equals(new Vector2d(1, 2))).toBe(true);
});

test('point bellowLine line', () => 
{
  const aboveLine = new Vector2d(0, 5).isAboveLine(new Vector2d(0, 0), new Vector2d(10, 0));
  expect(aboveLine).toBe(false);
});

test('point above line', () => 
{
  const aboveLine = new Vector2d(0, -5).isAboveLine(new Vector2d(0, 0), new Vector2d(10, 0));
  expect(aboveLine).toBe(true);
});

test('rotate points around pivot', () => 
{
  const rotatedPoint = new Vector2d(0, -5).rotateAroundPivot(new Vector2d(0, 0), Math.PI / 2);
  expect(rotatedPoint.x).toBeCloseTo(5);
  expect(rotatedPoint.y).toBeCloseTo(0);
});

test('find angle', () => 
{
  const angle = findAngle(new Vector2d(-5, 0), new Vector2d(0, 0), new Vector2d(0, 5));
  expect(angle).toBeCloseTo(Math.PI / 2);
});
