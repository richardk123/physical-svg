import {Intersector} from "./intersector";
import {Vector} from "matter-js";
import {vectorEquals} from "../../base/math_utils";
import {
    CurveToCommandMadeAbsolute, MoveToCommandMadeAbsolute,
    QuadraticCurveToCommandMadeAbsolute,
    SmoothCurveToCommandMadeAbsolute
} from "svg-path-parser";
import {CurveCommandType} from "../../base/command_mapper";

export class CurvePointIntersector implements Intersector<CurveCommandType, MoveToCommandMadeAbsolute>
{
    intersects(curve: CurveToCommandMadeAbsolute | SmoothCurveToCommandMadeAbsolute | QuadraticCurveToCommandMadeAbsolute, point: MoveToCommandMadeAbsolute): boolean
    {
        const curveStart = Vector.create(curve.x0, curve.y0);
        const curveEnd = Vector.create(curve.x, curve.y);
        const pointVec = Vector.create(point.x, point.y);

        return vectorEquals(curveStart, pointVec) || vectorEquals(curveEnd, pointVec);
    }

    supportedCommandTypes(): [string[], string[]]
    {
        return [["C", "S", "Q"], ["M"]];
    }
}