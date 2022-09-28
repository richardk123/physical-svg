import {Intersector} from "./Intersector";
import {LineShape} from "../../base/shape/line_shape";
import {Vector} from "matter-js";
import {multiplyVec} from "../../base/math_utils";

export class LineLineIntersector implements Intersector<LineShape, LineShape>
{
    intersects(shape1: LineShape, shape2: LineShape): boolean
    {
        const p1 = Vector.create(shape1.command.x, shape1.command.y);
        const p2 = Vector.create(shape1.command.x0, shape1.command.y0);

        const q1 = Vector.create(shape2.command.x, shape2.command.y);
        const q2 = Vector.create(shape2.command.x0, shape2.command.y0);

        const r = Vector.sub(p2, p1);
        const s = Vector.sub(q2, q1);
        const rxs = Vector.cross(r, s);
        const qpxr = Vector.cross(Vector.sub(q1, p1), r);

        // If r x s = 0 and (q - p) x r = 0, then the two lines are collinear.
        if (this.isZero(rxs) && this.isZero(qpxr))
        {
            const q1p1rLength = Vector.magnitude(multiplyVec(Vector.sub(q1, p1), r));
            const p1q1sLength = Vector.magnitude(multiplyVec(Vector.sub(p1, q1), s));
            const rSquaredLength = Vector.magnitude(multiplyVec(r, r));
            const sSquaredLength = Vector.magnitude(multiplyVec(s, s));

            // 1. If either  0 <= (q - p) * r <= r * r or 0 <= (p - q) * s <= * s
            // then the two lines are overlapping,
            if ((0 <= q1p1rLength && q1p1rLength <= rSquaredLength) ||
                0 <= (p1q1sLength && p1q1sLength <= sSquaredLength))
            {
                return true;
            }

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
        const t = Vector.cross(Vector.sub(q1, p1), s) / rxs;

        // u = (q - p) x r / (r x s)
        const u = Vector.cross(Vector.sub(q1, p1), r) / rxs;

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