import {Intersector} from "./intersector";
import {Vector} from "matter-js";
import {vectorEquals} from "../../base/math_utils";
import {MoveToCommandMadeAbsolute} from "svg-path-parser";

export class PointPointIntersector implements Intersector<MoveToCommandMadeAbsolute, MoveToCommandMadeAbsolute>
{
    intersects(point1: MoveToCommandMadeAbsolute, point2: MoveToCommandMadeAbsolute): boolean
    {
        const point1Vec = Vector.create(point1.x, point1.y);
        const point2Vec = Vector.create(point2.x, point2.y);

        return vectorEquals(point1Vec, point2Vec);
    }

    supportedCommandTypes(): [string[], string[]]
    {
        return [["M"], ["M"]];
    }
}