import {Bodies, Body, Vector, World} from "matter-js";
import {PointShape} from "../../../base/shape/point_shape";
import {AbstractBody} from "./abstract_body";

export class PointBody extends AbstractBody<PointShape>
{
    readonly _point: Body;

    constructor(pointShape: PointShape, parent: Body)
    {
        super(pointShape, parent);

        const center = this._shape.center;
        this._point = Bodies.circle(center.x, center.y,1,
            {render: {fillStyle: "white"}, isSensor: true});
        Body.setDensity(this._point, 0);
    }

    get body(): Body[]
    {
        return [this._point];
    }

    updateSvgCommand(): void
    {
        this._shape.command.x = this._point.position.x;
        this._shape.command.y = this._point.position.y;
    }

}