import {Bodies, Body} from "matter-js";
import {MoveToCommandMadeAbsolute} from "svg-path-parser";
import {CommandBody} from "./command_body";

export class PointBody implements CommandBody<MoveToCommandMadeAbsolute>
{
    readonly _bodies: Body[];
    readonly _point: Body;
    readonly _moveCmd: MoveToCommandMadeAbsolute;

    constructor(moveCmd: MoveToCommandMadeAbsolute)
    {
        this._moveCmd = moveCmd;

        this._point = Bodies.circle(moveCmd.x, moveCmd.y,1,
            {render: {fillStyle: "white"}, isSensor: true});
        Body.setDensity(this._point, 0);

        this._bodies = [this._point];
    }

    get bodies(): Body[]
    {
        return this._bodies;
    }

    updateSvgCommand(): void
    {
        this._moveCmd.x = this._point.position.x;
        this._moveCmd.y = this._point.position.y;
    }

}