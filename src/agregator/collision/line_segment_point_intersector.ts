import {Intersector} from "./intersector";
import {LineShape} from "../../base/shape/line_shape";
import {PointShape} from "../../base/shape/point_shape";

export class LineSegmentPointIntersector implements Intersector<LineShape, PointShape>
{
    intersects(line: LineShape, point: PointShape): boolean
    {
        const a = {x: line.x, y: line.y};
        const b = {x: line.x0, y: line.y0};
        const c = point;
        const crossProduct = (c.y - a.y) * (b.x - a.x) - (c.x - a.x) * (b.y - a.y)

        // compare versus epsilon for floating point values, or != 0 if using integers
        if (Math.abs(crossProduct) > 1e-10)
        {
            return false;
        }

        const dotProduct = (c.x - a.x) * (b.x - a.x) + (c.y - a.y)*(b.y - a.y)
        if (dotProduct < 0)
        {
            return false;
        }

        const squaredlengthba = (b.x - a.x)*(b.x - a.x) + (b.y - a.y)*(b.y - a.y)
        return dotProduct <= squaredlengthba;
    }

    supportedShapeTypes(): [string, string]
    {
        return ["L", "M"];
    }

}