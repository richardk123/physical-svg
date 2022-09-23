import {Intersector} from "./intersector";
import {CurveShape} from "../../base/shape/curve_shape";
import {Vector2d} from "../../base/vector2d";

export class CurveCurveIntersector implements Intersector<CurveShape, CurveShape>
{
    intersects(curve1: CurveShape, curve2: CurveShape): boolean
    {
        const curve1Start = new Vector2d(curve1.command.x0, curve1.command.y0);
        const curve1End = new Vector2d(curve1.command.x, curve1.command.y);
        const curve2Start = new Vector2d(curve2.command.x0, curve2.command.y0);
        const curve2End = new Vector2d(curve2.command.x, curve2.command.y);

        if (curve1Start.equals(curve2Start) ||
            curve1Start.equals(curve2End) ||
            curve1End.equals(curve2Start) ||
            curve1End.equals(curve2End))
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