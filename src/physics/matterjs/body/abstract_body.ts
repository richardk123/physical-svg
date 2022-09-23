import {Shape} from "../../../base/shape/shape";
import {Command} from "svg-path-parser";
import {Body, Vector, World} from "matter-js";
import {findAngle, rotatePointAroundCenterPoint} from "../../../base/math_utils";

export abstract class AbstractBody<T extends Shape<Command>>
{
    protected _shape: T;
    protected _parent: Body;

    constructor(shape: T, parent: Body)
    {
        this._shape = shape;
        this._parent = parent;
    }

    // set values back to svg command
    abstract setPositionsToShape(): void

    // return physics body
    abstract get body(): Body[];

}
