import {Intersector} from "./intersector";
import {Vector} from "matter-js";
import {vectorEquals} from "../../base/math_utils";
import {findCurvePoints} from "../../base/command_utils";
import {Bezier} from "./../../bezierjs/bezier.js";
import {CurveCommandType} from "../../base/command_mapper";

export class CurveCurveIntersector implements Intersector<CurveCommandType, CurveCommandType>
{
    intersects(curve1: CurveCommandType, curve2: CurveCommandType): boolean
    {
        const curve1Start = Vector.create(curve1.x0, curve1.y0);
        const curve1End = Vector.create(curve1.x, curve1.y);
        const curve2Start = Vector.create(curve2.x0, curve2.y0);
        const curve2End = Vector.create(curve2.x, curve2.y);

        if (vectorEquals(curve1Start, curve2Start) ||
            vectorEquals(curve1Start, curve2End) ||
            vectorEquals(curve1End, curve2Start) ||
            vectorEquals(curve1End, curve2End))
        {
            return true;
        }

        const bezier1 = new Bezier(findCurvePoints(curve1));
        const bezier2 = new Bezier(findCurvePoints(curve2));

        const result = bezier1.curveintersects([bezier1], [bezier2]);

        return result.length !== 0;
    }

    supportedCommandTypes(): [string[], string[]]
    {
        return [["C", "S", "Q"], ["C", "S", "Q"]];
    }
}