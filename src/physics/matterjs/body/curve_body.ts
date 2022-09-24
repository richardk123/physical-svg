import {Bodies, Body, Common, Composites, Vector, Vertices} from "matter-js";
import {AbstractBody} from "./abstract_body";
import {CurveShape} from "../../../base/shape/curve_shape";
import {Bezier, Point} from "bezier-js";
import {
    distance,
    findAngle
} from "../../../base/math_utils";
import {
    CurveToCommandMadeAbsolute,
    QuadraticCurveToCommandMadeAbsolute,
    SmoothCurveToCommandMadeAbsolute
} from "svg-path-parser";

export class CurveBody extends AbstractBody<CurveShape>
{
    readonly _bodies: Body[];
    readonly _point1: Body;
    readonly _point2: Body | undefined;
    readonly _point3: Body | undefined;

    constructor(curveShape: CurveShape, parent: Body)
    {
        super(curveShape, parent);

        const cmd = curveShape.command;
        const midPoint = curveShape.center;
        const height = curveShape.svgData.relativeStrokeWidth;


        // TODO: parametrize lut steps based on length
        const bezierPoints = this.createPoints(curveShape.bezier, 3);

        this._bodies = this.createInnerBodies(bezierPoints, height);

        this._point1 = Bodies.circle(curveShape.command.x, curveShape.command.y,1,
            {isSensor: true, render: {fillStyle: "lightblue"}});
        Body.setDensity(this._point1, 0);
        this._bodies.push(this._point1);

        if (curveShape.command.code === "Q" || curveShape.command.code === "C")
        {
            this._point2 = Bodies.circle(curveShape.command.x1, curveShape.command.y1,1,
                {isSensor: true, render: {fillStyle: "lightblue"}});
            Body.setDensity(this._point2, 0);
            this._bodies.push(this._point2);
        }

        if (curveShape.command.code === "S" || curveShape.command.code === "C")
        {
            this._point3 = Bodies.circle(curveShape.command.x2, curveShape.command.y2,1,
                {isSensor: true, render: {fillStyle: "lightblue"}});
            Body.setDensity(this._point3, 0);
            this._bodies.push(this._point3);
        }
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

    updateSvgCommand(): void
    {
        switch (this._shape.command.code)
        {
            case "S":
            {
                const command = this._shape.command as SmoothCurveToCommandMadeAbsolute;
                command.x = this._point1.position.x;
                command.y = this._point1.position.y;

                command.x2 = this._point3!.position.x;
                command.y2 = this._point3!.position.y;
                break;
            }
            case "C":
            {
                const command = this._shape.command as CurveToCommandMadeAbsolute;
                command.x = this._point1.position.x;
                command.y = this._point1.position.y;

                command.x1 = this._point2!.position.x;
                command.y1 = this._point2!.position.y;

                command.x2 = this._point3!.position.x;
                command.y2 = this._point3!.position.y;
                break;
            }
            case "Q":
            {
                const command = this._shape.command as QuadraticCurveToCommandMadeAbsolute;
                command.x = this._point1.position.x;
                command.y = this._point1.position.y;

                command.x1 = this._point2!.position.x;
                command.y1 = this._point2!.position.y;
                break;
            }
        }
    }
}
