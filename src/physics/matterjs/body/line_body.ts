import {LineShape} from "../../../base/shape/line_shape";
import {Bodies, Body, Vector, World} from "matter-js";
import {AbstractBody} from "./abstract_body";

export class LineBody extends AbstractBody<LineShape>
{
    readonly _body: Body;
    readonly _point: Body;

    constructor(lineShape: LineShape, parent: Body)
    {
        super(lineShape, parent);

        const lineCmd = lineShape.command;
        const lineMidPoint = lineShape.center;
        const height = lineShape.svgData.relativeStrokeWidth;

        this._point = Bodies.circle(lineShape.command.x, lineShape.command.y,1, {isSensor: true});
        Body.setDensity(this._point, 0);
        this._body = Bodies.rectangle(
            lineMidPoint.x, lineMidPoint.y, lineShape.findLength(), height,
            {
                angle: lineShape.findAngle()
            });
    }

    get body(): Body[]
    {
        return [this._body, this._point];
    }

    setPositionsToShape(): void
    {
        this._shape.command.x = this._point.position.x;
        this._shape.command.y = this._point.position.y;
    }

}
