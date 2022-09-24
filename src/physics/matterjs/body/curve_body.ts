import {Bodies, Body} from "matter-js";
import {CurveShape} from "../../../base/shape/curve_shape";
import {
    CurveToCommandMadeAbsolute,
} from "svg-path-parser";
import {AbstractCurveBody} from "./abstract_curve_body";

export class CurveBody extends AbstractCurveBody
{
    readonly _bodies: Body[];
    readonly _point1: Body;
    readonly _point2: Body;
    readonly _point3: Body;

    constructor(curveShape: CurveShape, parent: Body)
    {
        super(curveShape, parent);

        const height = curveShape.svgData.relativeStrokeWidth;

        const command = this._shape.command as CurveToCommandMadeAbsolute;
        this._bodies = this.createInnerBodies(height);

        this._point1 = Bodies.circle(command.x, command.y,1,
            {isSensor: true, render: {fillStyle: "lightblue"}});
        Body.setDensity(this._point1, 0);
        this._bodies.push(this._point1);

        this._point2 = Bodies.circle(command.x1, command.y1,1,
            {isSensor: true, render: {fillStyle: "lightblue"}});
        Body.setDensity(this._point2, 0);
        this._bodies.push(this._point2);

        this._point3 = Bodies.circle(command.x2, command.y2,1,
            {isSensor: true, render: {fillStyle: "lightblue"}});
        Body.setDensity(this._point3, 0);
        this._bodies.push(this._point3);
    }

    get body(): Body[]
    {
        return this._bodies;
    }

    updateSvgCommand(): void
    {
        const command = this._shape.command as CurveToCommandMadeAbsolute;
        command.x = this._point1.position.x;
        command.y = this._point1.position.y;

        command.x1 = this._point2.position.x;
        command.y1 = this._point2.position.y;

        command.x2 = this._point3.position.x;
        command.y2 = this._point3.position.y;
    }
}
