import {Bodies, Body} from "matter-js";
import {
    CurveToCommandMadeAbsolute,
} from "svg-path-parser";
import {AbstractCurveBody} from "./abstract_curve_body";

export class CurveBody extends AbstractCurveBody<CurveToCommandMadeAbsolute>
{
    readonly _curve: CurveToCommandMadeAbsolute;
    readonly _bodies: Body[];
    readonly _point1: Body;
    readonly _point2: Body;
    readonly _point3: Body;

    constructor(curve: CurveToCommandMadeAbsolute)
    {
        super();

        this._curve = curve;

        // TODO: parametrize
        const height = 5;

        this._bodies = this.createInnerBodies(height, curve);

        this._point1 = Bodies.circle(curve.x, curve.y,1,
            {isSensor: true, render: {fillStyle: "lightblue"}});
        Body.setDensity(this._point1, 0);
        this._bodies.push(this._point1);

        this._point2 = Bodies.circle(curve.x1, curve.y1,1,
            {isSensor: true, render: {fillStyle: "lightblue"}});
        Body.setDensity(this._point2, 0);
        this._bodies.push(this._point2);

        this._point3 = Bodies.circle(curve.x2, curve.y2,1,
            {isSensor: true, render: {fillStyle: "lightblue"}});
        Body.setDensity(this._point3, 0);
        this._bodies.push(this._point3);
    }

    get bodies(): Body[]
    {
        return this._bodies;
    }

    updateSvgCommand(): void
    {
        this._curve.x = this._point1.position.x;
        this._curve.y = this._point1.position.y;

        this._curve.x1 = this._point2.position.x;
        this._curve.y1 = this._point2.position.y;

        this._curve.x2 = this._point3.position.x;
        this._curve.y2 = this._point3.position.y;
    }
}
