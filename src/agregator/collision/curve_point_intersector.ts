import {Intersector} from "./intersector";
import {CurveShape} from "../../base/shape/curve_shape";
import {Vector2d} from "../../base/vector2d";
import {PointShape} from "../../base/shape/point_shape";

export class CurvePointIntersector implements Intersector<CurveShape, PointShape>
{
    intersects(curve: CurveShape, point: PointShape): boolean
    {
        const curveStart = new Vector2d(curve.command.x0, curve.command.y0);
        const curveEnd = new Vector2d(curve.command.x, curve.command.y);
        const pointVec = new Vector2d(point.command.x, point.command.y);

        return curveStart.equals(pointVec) || curveEnd.equals(pointVec);
    }

    supportedShapeTypes(): [string, string]
    {
        return ["C", "M"];
    }
}