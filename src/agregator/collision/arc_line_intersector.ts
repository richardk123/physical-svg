import {Intersector} from "./intersector";
import {EllipticalArcCommandMadeAbsolute, LineToCommandMadeAbsolute, MoveToCommandMadeAbsolute} from "svg-path-parser";
import {Vector} from "matter-js";
import {vectorEquals} from "../../base/math_utils";

export class ArcLineIntersector implements Intersector<EllipticalArcCommandMadeAbsolute, LineToCommandMadeAbsolute>
{
    intersects(command1: EllipticalArcCommandMadeAbsolute, command2: LineToCommandMadeAbsolute): boolean
    {
        const arcStart = Vector.create(command1.x0, command1.y0);
        const arcEnd = Vector.create(command1.x, command1.y);
        const lineStart = Vector.create(command2.x, command2.y);
        const lineEnd = Vector.create(command2.x0, command2.y0);

        return vectorEquals(arcStart, lineStart) || vectorEquals(arcEnd, lineStart) || vectorEquals(arcEnd, lineEnd) || vectorEquals(arcEnd, lineEnd);
    }

    supportedCommandTypes(): [string[], string[]]
    {
        return [['A'], ['L', 'Z']];
    }

}