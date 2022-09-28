import {Line} from "../base/command_mapper";
import {findCenterOfLine} from "../base/math_utils";
import {findAngleOfLineCommand, findCenterOfLineCommand, findLengthOfLineCommand} from "../base/command_utils";

test('line center', () =>
{
    const lineCommand = new Line(0, 0, 5, 5);
    const center = findCenterOfLineCommand(lineCommand);
    expect(center.x).toBe(2.5);
    expect(center.y).toBe(2.5);
});


test('line angle 0', () =>
{
    const lineCommand = new Line(0, 0, 5, 0);
    const angle = findAngleOfLineCommand(lineCommand);
    expect(angle).toBeCloseTo(0);
});

test('line angle 90', () =>
{
    const lineCommand = new Line(0, 0, 0, 5);
    const angle = findAngleOfLineCommand(lineCommand);
    expect(angle).toBeCloseTo(Math.PI / 2);
});

test('line angle 180', () =>
{
    const lineCommand = new Line(0, 0, -5, 0);
    const angle = findAngleOfLineCommand(lineCommand);
    expect(angle).toBeCloseTo(Math.PI);
});

test('line angle 270', () =>
{
    const lineCommand = new Line(0, 0, 0, -5);
    const angle = findAngleOfLineCommand(lineCommand);
    expect(angle).toBeCloseTo(Math.PI + Math.PI / 2);
});

test('line angle 45', () =>
{
    const lineCommand = new Line(0, 0, 5, 5);
    const angle = findAngleOfLineCommand(lineCommand);
    expect(angle).toBeCloseTo(Math.PI / 4);
});

test('line length', () =>
{
    const lineCommand = new Line(0, 0, 0, 5);
    const length = findLengthOfLineCommand(lineCommand);
    expect(length).toBe(5);
});

