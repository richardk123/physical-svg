import {Bezier} from "../../bezierjs/bezier.js";
import {Bodies, Body, Vector} from "matter-js";
import {findDistanceVec, findAngle} from "../../base/math_utils";
import {CurveCommandType} from "../../base/command_mapper";
import {findCurvePoints} from "../../base/command_utils";
import {CommandBody} from "./command_body";

export abstract class AbstractCurveBody<T extends CurveCommandType> implements CommandBody<T>
{

    private createPoints(bezier: Bezier, numberOfPoints: number): {x: number, y: number}[]
    {
        const fraction = 1 / numberOfPoints;
        return Array.from(Array(numberOfPoints + 1).keys()).map(i => bezier.get(i * fraction));
    }

    protected createInnerBodies(colliderSize: number, curve: CurveCommandType): Body[]
    {
        const curvePoints = findCurvePoints(curve);
        const bezierPoints = this.createPoints(new Bezier(curvePoints), 3);

        return bezierPoints
            .filter((bp, index) => index < bezierPoints.length - 1)
            .map((bp, index) =>
            {
                const current = Vector.create(bp.x, bp.y);
                const next = Vector.create(bezierPoints[index + 1].x, bezierPoints[index + 1].y);
                const direction = Vector.normalise(Vector.sub(next, current));

                const midPoint = Vector.create((current.x + next.x) / 2,(current.y + next.y) / 2);
                const d = findDistanceVec(next, current);

                return Bodies.rectangle(midPoint.x, midPoint.y, d, colliderSize,
                    {
                        angle: findAngle(next.x, next.y, current.x, current.y)
                    });
            })
    }

    abstract get bodies(): Body[];

    abstract updateSvgCommand(): void;
}