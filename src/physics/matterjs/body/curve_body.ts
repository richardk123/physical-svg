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
    readonly _point1: Body;
    readonly _point2: Body;
    readonly _point3: Body;


    constructor(curveShape: CurveShape, parent: Body)
    {
        super(curveShape, parent);

        const cmd = curveShape.command;
        const midPoint = curveShape.center;
        const height = curveShape.svgData.relativeStrokeWidth;

        this._point1 = Bodies.circle(curveShape.command.x, curveShape.command.y,1);
        this._point2 = Bodies.circle(curveShape.command.x1, curveShape.command.y1,1);
        this._point3 = Bodies.circle(curveShape.command.x2, curveShape.command.y2,1);

        // TODO: parametrize lut steps based on length
        const bezierPoints = curveShape.bezier.getLUT(10);

        this._bodies = this.createInnerBodies(bezierPoints, height);
        this._bodies.push(this._point1);
        this._bodies.push(this._point2);
        this._bodies.push(this._point3);
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

    setPositionsToShape(): void
    {
        this._shape.command.x = this._point1.position.x;
        this._shape.command.y = this._point1.position.y;

        this._shape.command.x1 = this._point2.position.x;
        this._shape.command.y1 = this._point2.position.y;

        this._shape.command.x2 = this._point3.position.x;
        this._shape.command.y2 = this._point3.position.y;

    }
}
