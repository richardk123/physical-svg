import {Bodies, Body, World} from "matter-js";
import {PointShape} from "../../../base/shape/point_shape";
import {AbstractBody} from "./abstract_body";

export class PointBody extends AbstractBody<PointShape>
{
    readonly _body: Body;

    constructor(pointShape: PointShape)
    {
        super(pointShape);

        const center = this._shape.center;
        this._body = Bodies.circle(center.x, center.y, 1);
    }

    get body(): Body
    {
        return this._body;
    }

    setPositionsToShape(): void
    {
        this._shape.command.x = this._body.position.x;
        this._shape.command.y = this._body.position.y;
    }

}