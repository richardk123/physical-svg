import {CurveShape} from "../../../base/shape/curve_shape";
import {Bodies, Body} from "matter-js";
import {AbstractCurveBody} from "./abstract_curve_body";
import {
    SmoothCurveToCommandMadeAbsolute
} from "svg-path-parser";

export class ReflectionCurveBody extends AbstractCurveBody
{
    readonly _bodies: Body[];
    readonly _point1: Body;
    readonly _point3: Body

    constructor(curveShape: CurveShape, parent: Body)
    {
        super(curveShape, parent);

        const height = curveShape.svgData.relativeStrokeWidth;

        this._bodies = this.createInnerBodies(height);
        const command = this._shape.command as SmoothCurveToCommandMadeAbsolute;

        this._point1 = Bodies.circle(command.x, command.y,1,
            {isSensor: true, render: {fillStyle: "lightblue"}});
        Body.setDensity(this._point1, 0);
        this._bodies.push(this._point1);

        this._point3 = Bodies.circle(command.x2, command.y2,1,
            {isSensor: true, render: {fillStyle: "lightblue"}});
        Body.setDensity(this._point3, 0);
        this._bodies.push(this._point3);
    }

    get body(): Matter.Body[]
    {
        return this._bodies;
    }

    updateSvgCommand(): void
    {
        const command = this._shape.command as SmoothCurveToCommandMadeAbsolute;
        command.x = this._point1.position.x;
        command.y = this._point1.position.y;

        command.x2 = this._point3!.position.x;
        command.y2 = this._point3!.position.y;
    }

}