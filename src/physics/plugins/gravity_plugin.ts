import {PhysicsPlugin} from "../physics_plugin";
import {Engine, Body} from "matter-js";
import {SvgData} from "../../base/svg_data";

export class GravityPlugin implements PhysicsPlugin
{
    private readonly _gravity: {x: number, y: number};

    constructor(gravity: {x: number, y: number})
    {
        this._gravity = gravity;
    }

    setup(svgData: SvgData, engine: Engine, rootBodies: Body[]): void
    {
        engine.gravity.x = this._gravity.x;
        engine.gravity.y = this._gravity.y;
    }

}