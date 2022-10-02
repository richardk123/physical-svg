import {Intersector} from "./intersector";
import {EllipticalArcCommandMadeAbsolute, LineToCommandMadeAbsolute, MoveToCommandMadeAbsolute} from "svg-path-parser";
import {Vector} from "matter-js";
import {vectorEquals} from "../../base/math_utils";
import {CurveCommandType} from "../../base/command_mapper";

export class ArcCurveIntersector implements Intersector<EllipticalArcCommandMadeAbsolute, CurveCommandType>
{
    intersects(command1: EllipticalArcCommandMadeAbsolute, command2: CurveCommandType): boolean
    {
        const arcStart = Vector.create(command1.x0, command1.y0);
        const arcEnd = Vector.create(command1.x, command1.y);
        const curveStart = Vector.create(command2.x, command2.y);
        const curveEnd = Vector.create(command2.x0, command2.y0);

        return vectorEquals(arcStart, curveStart) || vectorEquals(arcEnd, curveStart) || vectorEquals(arcEnd, curveEnd) || vectorEquals(arcEnd, curveEnd);
    }

    supportedCommandTypes(): [string[], string[]]
    {
        return [["A"], ["C", "S", "Q"]];
    }

}