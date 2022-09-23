import {LineShape} from "../../../base/shape/line_shape";
import {Bodies, Body, World} from "matter-js";
import {AbstractBody} from "./abstract_body";

export class LineBody extends AbstractBody<LineShape>
{
    readonly _body: Body;

    constructor(lineShape: LineShape, parent: Body)
    {
        super(lineShape, parent);

        const lineCmd = lineShape.command;
        const lineMidPoint = lineShape.center;
        const height = lineShape.svgData.relativeStrokeWidth;

        this._body = Bodies.rectangle(
            lineMidPoint.x, lineMidPoint.y, lineShape.findLength(), height,
            {
                angle: lineShape.findAngle()
            });
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
