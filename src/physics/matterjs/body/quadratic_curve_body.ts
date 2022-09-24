import {AbstractCurveBody} from "./abstract_curve_body";
import {Bodies, Body} from "matter-js";
import {CurveShape} from "../../../base/shape/curve_shape";
import {
    QuadraticCurveToCommandMadeAbsolute,
} from "svg-path-parser";

export class QuadraticCurveBody extends AbstractCurveBody
{
    readonly _bodies: Body[];
    readonly _point1: Body;
    readonly _point2: Body;

    constructor(curveShape: CurveShape, parent: Body)
    {
        super(curveShape, parent);

        const height = curveShape.svgData.relativeStrokeWidth;

        this._bodies = this.createInnerBodies(height);
        const command = this._shape.command as QuadraticCurveToCommandMadeAbsolute;

        this._point1 = Bodies.circle(command.x, command.y,1,
            {isSensor: true, render: {fillStyle: "lightblue"}});
        Body.setDensity(this._point1, 0);
        this._bodies.push(this._point1);

        this._point2 = Bodies.circle(command.x1, command.y1,1,
            {isSensor: true, render: {fillStyle: "lightblue"}});
        Body.setDensity(this._point2, 0);
        this._bodies.push(this._point2);
    }

    get body(): Matter.Body[]
    {
        return this._bodies;
    }

    updateSvgCommand(): void
    {
        const command = this._shape.command as QuadraticCurveToCommandMadeAbsolute;
        command.x = this._point1.position.x;
        command.y = this._point1.position.y;

        command.x1 = this._point2!.position.x;
        command.y1 = this._point2!.position.y;
    }

}