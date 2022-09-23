import {Bodies, Body, Common, Composites, Vector, Vertices} from "matter-js";
import {AbstractBody} from "./abstract_body";
import {CurveShape} from "../../../base/shape/curve_shape";
import {Bezier, Point} from "bezier-js";
import {
    distance,
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

        this._point1 = Bodies.circle(curveShape.command.x, curveShape.command.y,1,
            {isSensor: true, render: {fillStyle: "lightblue"}});
        this._point2 = Bodies.circle(curveShape.command.x1, curveShape.command.y1,1,
            {isSensor: true, render: {fillStyle: "lightblue"}});
        this._point3 = Bodies.circle(curveShape.command.x2, curveShape.command.y2,1,
            {isSensor: true, render: {fillStyle: "lightblue"}});

        Body.setDensity(this._point1, 0);
        Body.setDensity(this._point2, 0);
        Body.setDensity(this._point3, 0);

        // TODO: parametrize lut steps based on length
        const bezierPoints = this.createPoints(curveShape.bezier, 5);

        this._bodies = this.createInnerBodies(bezierPoints, height);
        this._bodies.push(this._point1);
        this._bodies.push(this._point2);
        this._bodies.push(this._point3);
    }

    private createPoints(bezier: Bezier, numberOfPoints: number): {x: number, y: number}[]
    {
        const fraction = 1 / numberOfPoints;
        return Array.from(Array(numberOfPoints + 1).keys()).map(i => bezier.get(i * fraction));
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

                const midPoint = Vector.create((current.x + next.x) / 2,(current.y + next.y) / 2);
                const d = distance(next, current);

                return Bodies.rectangle(midPoint.x, midPoint.y, d, height,
                    {
                        angle: findAngle(next.x, next.y, current.x, current.y)
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
