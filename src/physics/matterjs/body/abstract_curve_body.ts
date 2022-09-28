import {Bezier} from "bezier-js";
import {Bodies, Body, Vector} from "matter-js";
import {findDistanceVec, findAngle} from "../../../base/math_utils";
import {AbstractBody} from "./abstract_body";
import {CurveShape} from "../../../base/shape/curve_shape";

export abstract class AbstractCurveBody extends AbstractBody<CurveShape>
{
    constructor(curveShape: CurveShape, parent: Body)
    {
        super(curveShape, parent);
    }

    private createPoints(bezier: Bezier, numberOfPoints: number): {x: number, y: number}[]
    {
        const fraction = 1 / numberOfPoints;
        return Array.from(Array(numberOfPoints + 1).keys()).map(i => bezier.get(i * fraction));
    }

    // TODO: parametrize lut steps based on length
    protected createInnerBodies(height: number): Body[]
    {
        const bezierPoints = this.createPoints(this._shape.bezier, 3);

        return bezierPoints
            .filter((bp, index) => index < bezierPoints.length - 1)
            .map((bp, index) =>
            {
                const current = Vector.create(bp.x, bp.y);
                const next = Vector.create(bezierPoints[index + 1].x, bezierPoints[index + 1].y);
                const direction = Vector.normalise(Vector.sub(next, current));

                const midPoint = Vector.create((current.x + next.x) / 2,(current.y + next.y) / 2);
                const d = findDistanceVec(next, current);

                return Bodies.rectangle(midPoint.x, midPoint.y, d, height,
                    {
                        angle: findAngle(next.x, next.y, current.x, current.y)
                    });
            })
    }
}