import {AbstractCurveBody} from "./abstract_curve_body";
import {Bodies, Body} from "matter-js";
import {
    QuadraticCurveToCommandMadeAbsolute,
} from "svg-path-parser";

export class QuadraticCurveBody extends AbstractCurveBody<QuadraticCurveToCommandMadeAbsolute>
{
    readonly _curve: QuadraticCurveToCommandMadeAbsolute;
    readonly _bodies: Body[];
    readonly _point1: Body;
    readonly _point2: Body;

    constructor(curve: QuadraticCurveToCommandMadeAbsolute, colliderSize: number)
    {
        super();

        this._curve = curve;

        this._bodies = this.createInnerBodies(colliderSize, curve);

        this._point1 = Bodies.circle(curve.x, curve.y,1,
            {isSensor: true, render: {fillStyle: "lightblue"}});
        Body.setDensity(this._point1, 0);
        this._bodies.push(this._point1);

        this._point2 = Bodies.circle(curve.x1, curve.y1,1,
            {isSensor: true, render: {fillStyle: "lightblue"}});
        Body.setDensity(this._point2, 0);
        this._bodies.push(this._point2);
    }

    get bodies(): Body[]
    {
        return this._bodies;
    }

    updateSvgCommand(): void
    {
        this._curve.x = this._point1.position.x;
        this._curve.y = this._point1.position.y;

        this._curve.x1 = this._point2!.position.x;
        this._curve.y1 = this._point2!.position.y;
    }

}