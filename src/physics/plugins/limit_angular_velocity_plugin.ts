import {PhysicsPlugin} from "../physics_plugin";
import {Engine, Body, Events} from "matter-js";
import {SvgData} from "../../base/svg_data";

export class LimitAngularVelocityPlugin implements PhysicsPlugin
{
    private readonly _maxSpeed: number;

    constructor(maxSpeed: number)
    {
        this._maxSpeed = maxSpeed;
    }

    setup(svgData: SvgData, engine: Engine, rootBodies: Body[]): void
    {
        const limitMaxSpeed = () =>
        {
            rootBodies.forEach(body =>
            {
                if (body.angularVelocity > this._maxSpeed)
                {
                    Body.setAngularVelocity(body, this._maxSpeed)
                }
                if (body.angularVelocity < -this._maxSpeed)
                {
                    Body.setAngularVelocity(body, -this._maxSpeed)
                }
            });
        }
        Events.on(engine, 'beforeUpdate', limitMaxSpeed);
    }

}