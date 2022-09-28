import {Intersector} from "./intersector";
import {CurveShape} from "../../base/shape/curve_shape";
import {LineShape} from "../../base/shape/line_shape";
import { Bezier, Point } from "bezier-js";
import {Vector} from "matter-js";
import {vectorEquals} from "../../base/math_utils";

export class LineCurveIntersector implements Intersector<CurveShape, LineShape>
{
    intersects(curve: CurveShape, line: LineShape): boolean
    {
        const curveStart = Vector.create(curve.command.x0, curve.command.y0);
        const curveEnd = Vector.create(curve.command.x, curve.command.y);
        const lineStart = Vector.create(line.command.x0, line.command.y0);
        const lineEnd = Vector.create(line.command.x, line.command.y);

        if (vectorEquals(curveStart, lineStart) ||
            vectorEquals(curveStart, lineEnd) ||
            vectorEquals(curveEnd, lineStart) ||
            vectorEquals(curveEnd, lineEnd))
        {
            return true;
        }

        const bezier = new Bezier(curve.curvePoints);

        return bezier.intersects({
            p1: {x: line.command.x0, y: line.command.y0},
            p2: {x: line.command.x, y: line.command.y}}).length !== 0;
    }

    supportedShapeTypes(): [string, string]
    {
        return ["C", "L"];
    }
}