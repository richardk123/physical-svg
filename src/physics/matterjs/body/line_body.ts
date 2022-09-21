import {LineShape} from "../../../base/shape/line_shape";
import {Bodies, Body, World} from "matter-js";
import {AbstractBody} from "./abstract_body";

export class LineBody extends AbstractBody<LineShape>
{
    readonly _length: number;
    readonly _body: Body;

    constructor(lineShape: LineShape)
    {
        super(lineShape);
        this._length = lineShape.findLength();

        const lineCmd = lineShape.command;
        const lineMidPoint = lineShape.center;
        const height = lineShape.svgData.relativeStrokeWidth;

        this._body = Bodies.rectangle(
            lineMidPoint.x, lineMidPoint.y, this._length, height,
            {
                angle: lineShape.findAngle()
            });
    }

    get body(): Body
    {
        return this._body;
    }

    setPositionsToShape(): void
    {
        const x = this._body.position.x;
        const y = this._body.position.y;
        const angle = this._body.parent.angle + this._body.angle;

        this._shape.command.x = x + Math.cos(angle - Math.PI) * (this._length / 2);
        this._shape.command.y = y + Math.sin(angle - Math.PI) * (this._length / 2);
    }

}
