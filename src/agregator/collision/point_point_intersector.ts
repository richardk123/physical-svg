import {Intersector} from "./intersector";
import {Vector2d} from "../../base/vector2d";
import {PointShape} from "../../base/shape/point_shape";

export class PointPointIntersector implements Intersector<PointShape, PointShape>
{
    intersects(point1: PointShape, point2: PointShape): boolean
    {
        const point1Vec = new Vector2d(point1.command.x, point1.command.y);
        const point2Vec = new Vector2d(point2.command.x, point2.command.y);

        return point1Vec.equals(point2Vec);
    }

    supportedShapeTypes(): [string, string]
    {
        return ["M", "M"];
    }
}