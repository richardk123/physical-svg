import {Bodies, Body, Vector} from "matter-js";
import {LineCommandType} from "../../../base/command_mapper";
import {findAngleOfLineCommand, findCenterOfLineCommand, findLengthOfLineCommand} from "../../../base/command_utils";
import {CommandBody} from "./command_body";
import {vectorEquals} from "../../../base/math_utils";
import {LineToCommandMadeAbsolute} from "svg-path-parser";

export class LineBody implements CommandBody<LineToCommandMadeAbsolute>
{
    readonly _bodies: Body[];
    readonly _lineCmd: LineToCommandMadeAbsolute;
    readonly _body: Body;
    readonly _point: Body;

    constructor(lineCmd: LineToCommandMadeAbsolute, colliderSize: number)
    {
        this._lineCmd = lineCmd;

        const lineMidPoint = findCenterOfLineCommand(lineCmd);
        const lineLength = findLengthOfLineCommand(lineCmd);
        const lineAngle = findAngleOfLineCommand(lineCmd);

        const p1 = Vector.create(lineCmd.x, lineCmd.y);
        const p2 = Vector.create(lineCmd.x0, lineCmd.y0);

        this._point = Bodies.circle(lineCmd.x, lineCmd.y,1, {isSensor: true});
        Body.setDensity(this._point, 0);

        this._body = Bodies.rectangle(
            lineMidPoint.x, lineMidPoint.y, lineLength, colliderSize,
            {
                angle: lineAngle
            });

        this._bodies = [this._point, this._body];
    }

    get bodies(): Body[]
    {
        return this._bodies;
    }

    updateSvgCommand(): void
    {
        this._lineCmd.x = this._point.position.x;
        this._lineCmd.y = this._point.position.y;
    }

}
