import {PhysicsPlugin} from "../physics_plugin";
import {Engine, Body, Events, Vector} from "matter-js";
import {SvgData} from "../../base/svg_data";

export class LimitVelocityPlugin implements PhysicsPlugin
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
                if (body.velocity.x > this._maxSpeed)
                {
                    Body.setVelocity(body, {x: this._maxSpeed, y: body.velocity.y});
                }

                if (body.velocity.x < -this._maxSpeed)
                {
                    Body.setVelocity(body, {x: -this._maxSpeed, y: body.velocity.y});
                }

                if (body.velocity.y > this._maxSpeed)
                {
                    Body.setVelocity(body, {x: body.velocity.x, y: this._maxSpeed});
                }

                if (body.velocity.y < -this._maxSpeed)
                {
                    Body.setVelocity(body, {x: -body.velocity.x, y: -this._maxSpeed});
                }
            });
        }
        Events.on(engine, 'beforeUpdate', limitMaxSpeed);
    }

}