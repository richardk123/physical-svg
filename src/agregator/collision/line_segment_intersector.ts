import {LineToCommandMadeAbsolute} from "svg-path-parser";
import {Vector2d} from "../../base/vector2d";
import {Intersector} from "./Intersector";
import {LineShape} from "../../base/shape/line_shape";

export class LineSegmentIntersector implements Intersector<LineShape, LineShape>
{
    intersects(cmd1: LineShape, cmd2: LineShape): boolean
    {
        const p1 = new Vector2d(cmd1.x, cmd1.y);
        const p2 = new Vector2d(cmd1.x0, cmd1.y0);

        const q1 = new Vector2d(cmd2.x, cmd2.y);
        const q2 = new Vector2d(cmd2.x0, cmd2.y0);

        const r = p2.deduct(p1);
        const s = q2.deduct(q1);
        const rxs = r.crossProduct(s);
        const qpxr = q1.deduct(p1).crossProduct(r);

        // If r x s = 0 and (q - p) x r = 0, then the two lines are collinear.
        if (this.isZero(rxs) && this.isZero(qpxr))
        {
            // 1. If either  0 <= (q - p) * r <= r * r or 0 <= (p - q) * s <= * s
            // then the two lines are overlapping,
            if ((0 <= q1.deduct(p1).multiplyV(r).length() && q1.deduct(p1).multiplyV(r).length() <= r.multiplyV(r).length()) ||
                0 <= (p1.deduct(q1).multiplyV(s).length() && p1.deduct(q1).multiplyV(s) <= s.multiplyV(s)))
                return true;

            // 2. If neither 0 <= (q - p) * r = r * r nor 0 <= (p - q) * s <= s * s
            // then the two lines are collinear but disjoint.
            // No need to implement this expression, as it follows from the expression above.
            return false;
        }

        // 3. If r x s = 0 and (q - p) x r != 0, then the two lines are parallel and non-intersecting.
        if (this.isZero(rxs) && !this.isZero(qpxr))
        {
            return false;
        }

        // t = (q - p) x s / (r x s)
        const t = (q1.deduct(p1)).crossProduct(s) / rxs;

        // u = (q - p) x r / (r x s)
        const u = (q1.deduct(p1)).crossProduct(r) / rxs;

        // 4. If r x s != 0 and 0 <= t <= 1 and 0 <= u <= 1
        // the two line segments meet at the point p + t r = q + u s.
        if (!this.isZero(rxs) && (0 <= t && t <= 1) && (0 <= u && u <= 1))
        {
            // An intersection was found.
            return true;
        }

        // 5. Otherwise, the two line segments are not parallel but do not intersect.
        return false;
    }

    supportedShapeTypes(): [string, string]
    {
        return ["L", "L"];
    }

    private isZero(d: number): boolean
    {
        return Math.abs(d) < 1e-10;
    }

}