import {Intersector} from "./intersector";
import {CurveShape} from "../../base/shape/curve_shape";
import {PointShape} from "../../base/shape/point_shape";
import {Vector} from "matter-js";
import {vectorEquals} from "../../base/math_utils";

export class CurvePointIntersector implements Intersector<CurveShape, PointShape>
{
    intersects(curve: CurveShape, point: PointShape): boolean
    {
        const curveStart = Vector.create(curve.command.x0, curve.command.y0);
        const curveEnd = Vector.create(curve.command.x, curve.command.y);
        const pointVec = Vector.create(point.command.x, point.command.y);

        return vectorEquals(curveStart, pointVec) || vectorEquals(curveEnd, pointVec);
    }

    supportedShapeTypes(): [string, string]
    {
        return ["C", "M"];
    }
}