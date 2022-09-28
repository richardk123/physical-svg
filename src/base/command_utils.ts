import {Vector} from "matter-js";
import {findAngle, findCenterOfLine, findDistanceVec} from "./math_utils";
import {CurveCommandType, LineCommandType, AllCommandTypes} from "./command_mapper";
import {Bezier} from "bezier-js";

export const findCenterOfCommand = (command: AllCommandTypes): Vector =>
{
    switch(command.code)
    {
        case "M": return Vector.create(command.x, command.y);
        case "T": throw new Error("T not supported");
        case "Z": return findCenterOfLineCommand(command);
        case "C": return findCenterOfCurveCommand(command);
        case "Q": return findCenterOfCurveCommand(command);
        case "S": return findCenterOfCurveCommand(command);
        case "L": return findCenterOfLineCommand(command);
    }
}

export const findCenterOfCurveCommand = (command: CurveCommandType): Vector =>
{
    const points = findCurvePoints(command);
    const bezierCenter = new Bezier(points).get(0.5);
    return Vector.create(bezierCenter.x, bezierCenter.y);
}

export const findCenterOfLineCommand = (command: LineCommandType): Vector =>
{
    return findCenterOfLine(Vector.create(command.x, command.y), Vector.create(command.x0, command.y0));
}

export const findAngleOfLineCommand = (command: LineCommandType): number =>
{
    return findAngle(command.x, command.y, command.x0, command.y0);
}

export const findLengthOfLineCommand = (command: LineCommandType): number =>
{
    return findDistanceVec(Vector.create(command.x, command.y), Vector.create(command.x0, command.y0));
}

export const findCurvePoints = (command: CurveCommandType): Vector[] =>
{
    switch (command.code)
    {
        case 'C':
        {
            return [
                Vector.create(command.x0, command.y0),
                Vector.create(command.x1, command.y1),
                Vector.create(command.x2, command.y2),
                Vector.create(command.x, command.y),
            ];
        }
        case 'Q':
        {
            return [
                Vector.create(command.x0, command.y0),
                Vector.create(command.x1, command.y1),
                Vector.create(command.x, command.y),
            ];
        }
        case "S":
        {
            return [
                Vector.create(command.x0, command.y0),
                Vector.create(command.x2, command.y2),
                Vector.create(command.x, command.y),
            ];
        }
        case "T":
        {
            throw new Error("T not defined");
        }
    }
}