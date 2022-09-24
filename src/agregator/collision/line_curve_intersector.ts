import {Intersector} from "./intersector";
import {CurveShape} from "../../base/shape/curve_shape";
import {LineShape} from "../../base/shape/line_shape";
import { Bezier, Point } from "bezier-js";
import {Vector2d} from "../../base/vector2d";

export class LineCurveIntersector implements Intersector<CurveShape, LineShape>
{
    intersects(curve: CurveShape, line: LineShape): boolean
    {
        const curveStart = new Vector2d(curve.command.x0, curve.command.y0);
        const curveEnd = new Vector2d(curve.command.x, curve.command.y);
        const lineStart = new Vector2d(line.command.x0, line.command.y0);
        const lineEnd = new Vector2d(line.command.x, line.command.y);

        if (curveStart.equals(lineStart) ||
            curveStart.equals(lineEnd) ||
            curveEnd.equals(lineStart) ||
            curveEnd.equals(lineEnd))
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