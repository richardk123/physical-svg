import {Intersector} from "./intersector";
import {CurveShape} from "../../base/shape/curve_shape";
import {LineShape} from "../../base/shape/line_shape";
import { Bezier, Point } from "bezier-js";
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

        const curve1Points = [
            {x: curve1.command.x0, y: curve1.command.y0},
            {x: curve1.command.x1, y: curve1.command.y1},
            {x: curve1.command.x2, y: curve1.command.y2},
            {x: curve1.command.x, y: curve1.command.y},
        ];
        const bezier1 = new Bezier(curve1Points);

        const curve2Points = [
            {x: curve2.command.x0, y: curve2.command.y0},
            {x: curve2.command.x1, y: curve2.command.y1},
            {x: curve2.command.x2, y: curve2.command.y2},
            {x: curve2.command.x, y:  curve2.command.y},
        ];
        const bezier2 = new Bezier(curve2Points);

        const result = bezier1.curveintersects([bezier1], [bezier2]);

        return result.length !== 0;
    }

    supportedShapeTypes(): [string, string]
    {
        return ["C", "C"];
    }
}