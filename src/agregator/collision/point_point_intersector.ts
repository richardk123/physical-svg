import {Intersector} from "./intersector";
import {PointShape} from "../../base/shape/point_shape";
import {Vector} from "matter-js";
import {vectorEquals} from "../../base/math_utils";

export class PointPointIntersector implements Intersector<PointShape, PointShape>
{
    intersects(point1: PointShape, point2: PointShape): boolean
    {
        const point1Vec = Vector.create(point1.command.x, point1.command.y);
        const point2Vec = Vector.create(point2.command.x, point2.command.y);

        return vectorEquals(point1Vec, point2Vec);
    }

    supportedShapeTypes(): [string, string]
    {
        return ["M", "M"];
    }
}