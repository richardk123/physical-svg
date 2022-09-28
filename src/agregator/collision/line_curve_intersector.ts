import {Intersector} from "./intersector";
import { Bezier } from "bezier-js";
import {Vector} from "matter-js";
import {vectorEquals} from "../../base/math_utils";
import {findCurvePoints, findLengthOfLineCommand} from "../../base/command_utils";
import {CurveCommandType, LineCommandType} from "../../base/command_mapper";

export class LineCurveIntersector implements Intersector<CurveCommandType, LineCommandType>
{
    intersects(curve: CurveCommandType, line: LineCommandType): boolean
    {
        const curveStart = Vector.create(curve.x0, curve.y0);
        const curveEnd = Vector.create(curve.x, curve.y);
        const lineStart = Vector.create(line.x0, line.y0);
        const lineEnd = Vector.create(line.x, line.y);

        if (vectorEquals(curveStart, lineStart) ||
            vectorEquals(curveStart, lineEnd) ||
            vectorEquals(curveEnd, lineStart) ||
            vectorEquals(curveEnd, lineEnd))
        {
            return true;
        }

        const bezier = new Bezier(findCurvePoints(curve));

        return bezier.intersects({ p1: lineStart, p2: lineEnd}).length !== 0;
    }

    supportedCommandTypes(): [string[], string[]]
    {
        return [["C", "S", "Q"], ["L", "Z"]];
    }
}