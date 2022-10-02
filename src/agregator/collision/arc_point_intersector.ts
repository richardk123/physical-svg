import {Intersector} from "./intersector";
import {EllipticalArcCommandMadeAbsolute, MoveToCommandMadeAbsolute} from "svg-path-parser";
import {Vector} from "matter-js";
import {vectorEquals} from "../../base/math_utils";

export class ArcPointIntersector implements Intersector<EllipticalArcCommandMadeAbsolute, MoveToCommandMadeAbsolute>
{
    intersects(command1: EllipticalArcCommandMadeAbsolute, command2: MoveToCommandMadeAbsolute): boolean
    {
        const arcStart = Vector.create(command1.x0, command1.y0);
        const arcEnd = Vector.create(command1.x, command1.y);
        const pointVec = Vector.create(command2.x, command2.y);

        return vectorEquals(arcStart, pointVec) || vectorEquals(arcEnd, pointVec);
    }

    supportedCommandTypes(): [string[], string[]]
    {
        return [['A'], ['M']];
    }

}