import {Bodies, Body, World} from "matter-js";
import {PointShape} from "../../../base/shape/point_shape";
import {AbstractBody} from "./abstract_body";

export class PointBody extends AbstractBody<PointShape>
{
    readonly _body: Body;

    constructor(pointShape: PointShape, parent: Body)
    {
        super(pointShape, parent);

        const center = this._shape.center;
        this._body = Bodies.circle(center.x, center.y, 1);
    }

    get body(): Body[]
    {
        return [this._body];
    }

    setPositionsToShape(deltaAngle: number, deltaX: number, deltaY: number): void
    {
        const newPoint = this.rotatePointAroundParent(this._shape.command.x + deltaX, this._shape.command.y + deltaY, deltaAngle);

        this._shape.command.x = newPoint.x;
        this._shape.command.y = newPoint.y;
    }

}