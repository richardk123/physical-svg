import {Shape} from "../../../base/shape/shape";
import {Command} from "svg-path-parser";
import {Body, World} from "matter-js";

export abstract class AbstractBody<T extends Shape<Command>>
{
    protected _shape: T;

    constructor(shape: T)
    {
        this._shape = shape;
    }

    // set values back to svg command
    abstract setPositionsToShape(): void

    // return physics body
    abstract get body(): Body;
}
