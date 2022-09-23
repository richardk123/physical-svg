import {Bodies, Body, Common, Composites, Vector, Vertices} from "matter-js";
import {AbstractBody} from "./abstract_body";
import {CurveShape} from "../../../base/shape/curve_shape";
import {Point} from "bezier-js";
import {
    findAngle
} from "../../../base/math_utils";

export class CurveBody extends AbstractBody<CurveShape>
{
    readonly _bodies: Body[];


    constructor(curveShape: CurveShape, parent: Body)
    {
        super(curveShape, parent);

        const cmd = curveShape.command;
        const midPoint = curveShape.center;
        const height = curveShape.svgData.relativeStrokeWidth;

        // TODO: parametrize lut steps based on length
        const bezierPoints = curveShape.bezier.getLUT(10);

        this._bodies = this.createInnerBodies(bezierPoints, height);
    }

    private createInnerBodies(bezierPoints: {x: number, y: number}[], height: number): Body[]
    {
        return bezierPoints
            .filter((bp, index) => index < bezierPoints.length - 1)
            .map((bp, index) =>
            {
                const current = Vector.create(bp.x, bp.y);
                const next = Vector.create(bezierPoints[index + 1].x, bezierPoints[index + 1].y);
                const direction = Vector.normalise(Vector.sub(next, current));

                const p1 = current;
                const p2 = next;
                const midPoint = {x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2};
                const distance = Math.abs(Vector.magnitude(p1) - Vector.magnitude(p2)) * 1.5;

                return Bodies.rectangle(midPoint.x, midPoint.y, distance, height,
                    {
                        angle: findAngle(p2.x, p2.y, p1.x, p1.y)
                    });
            })
    }

    get body(): Body[]
    {
        return this._bodies;
    }

    setPositionsToShape(deltaAngle: number, deltaX: number, deltaY: number): void
    {
        const newP1 = this.rotatePointAroundParent(this._shape.command.x + deltaX, this._shape.command.y + deltaY, deltaAngle);
        this._shape.command.x = newP1.x;
        this._shape.command.y = newP1.y;

        const newP2 = this.rotatePointAroundParent(this._shape.command.x1 + deltaX, this._shape.command.y1 + deltaY, deltaAngle);
        this._shape.command.x1 = newP2.x;
        this._shape.command.y1 = newP2.y;

        const newP3 = this.rotatePointAroundParent(this._shape.command.x2 + deltaX, this._shape.command.y2 + deltaY, deltaAngle);
        this._shape.command.x2 = newP3.x;
        this._shape.command.y2 = newP3.y;

    }
}
