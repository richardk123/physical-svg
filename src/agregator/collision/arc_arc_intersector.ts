import {Intersector} from "./intersector";
import {EllipticalArcCommandMadeAbsolute, LineToCommandMadeAbsolute, MoveToCommandMadeAbsolute} from "svg-path-parser";
import {Vector} from "matter-js";
import {vectorEquals} from "../../base/math_utils";
import {CurveCommandType} from "../../base/command_mapper";

export class ArcArcIntersector implements Intersector<EllipticalArcCommandMadeAbsolute, EllipticalArcCommandMadeAbsolute>
{
    intersects(command1: EllipticalArcCommandMadeAbsolute, command2: EllipticalArcCommandMadeAbsolute): boolean
    {
        const arc1Start = Vector.create(command1.x0, command1.y0);
        const arc1End = Vector.create(command1.x, command1.y);
        const arc2Start = Vector.create(command2.x, command2.y);
        const arc2End = Vector.create(command2.x0, command2.y0);

        return vectorEquals(arc1Start, arc2Start) || vectorEquals(arc1End, arc2Start) || vectorEquals(arc1End, arc2End) || vectorEquals(arc1End, arc2End);
    }

    supportedCommandTypes(): [string[], string[]]
    {
        return [["A"], ["A"]];
    }

}