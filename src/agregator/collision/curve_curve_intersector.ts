import {Intersector} from "./intersector";
import {CurveShape} from "../../base/shape/curve_shape";
import {Vector} from "matter-js";
import {vectorEquals} from "../../base/math_utils";

export class CurveCurveIntersector implements Intersector<CurveShape, CurveShape>
{
    intersects(curve1: CurveShape, curve2: CurveShape): boolean
    {
        const curve1Start = Vector.create(curve1.command.x0, curve1.command.y0);
        const curve1End = Vector.create(curve1.command.x, curve1.command.y);
        const curve2Start = Vector.create(curve2.command.x0, curve2.command.y0);
        const curve2End = Vector.create(curve2.command.x, curve2.command.y);

        if (vectorEquals(curve1Start, curve2Start) ||
            vectorEquals(curve1Start, curve2End) ||
            vectorEquals(curve1End, curve2Start) ||
            vectorEquals(curve1End, curve2End))
        {
            return true;
        }

        const bezier1 = curve1.bezier;
        const bezier2 = curve2.bezier;

        const result = bezier1.curveintersects([bezier1], [bezier2]);

        return result.length !== 0;
    }

    supportedShapeTypes(): [string, string]
    {
        return ["C", "C"];
    }
}