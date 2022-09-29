import {CommandBody} from "./command_body";
import {ClosePathCommandMadeAbsolute} from "svg-path-parser";
import {Bodies, Body, Vector} from "matter-js";
import {LineCommandType} from "../../base/command_mapper";
import {findAngleOfLineCommand, findCenterOfLineCommand, findLengthOfLineCommand} from "../../base/command_utils";
import {vectorEquals} from "../../base/math_utils";

export class ClosePathBody implements CommandBody<ClosePathCommandMadeAbsolute>
{
    readonly _bodies: Body[];
    readonly _closeCmd: LineCommandType;

    constructor(closeCmd: LineCommandType)
    {
        this._closeCmd = closeCmd;

        // TODO: parametrize
        const height = 5;

        const p1 = Vector.create(closeCmd.x, closeCmd.y);
        const p2 = Vector.create(closeCmd.x0, closeCmd.y0);

        if (!vectorEquals(p1, p2))
        {
            const lineMidPoint = findCenterOfLineCommand(closeCmd);
            const lineLength = findLengthOfLineCommand(closeCmd);
            const lineAngle = findAngleOfLineCommand(closeCmd);

            const body = Bodies.rectangle(
                lineMidPoint.x, lineMidPoint.y, lineLength, height,
                {
                    angle: lineAngle
                });

            this._bodies = [body];
        }
        else
        {
            this._bodies = [];
        }
    }

    get bodies(): Body[]
    {
        return this._bodies;
    }

    updateSvgCommand(): void
    {
        // For Z command don't update anything
    }

}