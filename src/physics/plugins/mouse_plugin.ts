import {PhysicsPlugin} from "../physics_plugin";
import {SvgData} from "../../base/svg_data";
import {Body, Composite, Engine, Events, Query, Render, Vector, World} from "matter-js";

export class MousePlugin implements PhysicsPlugin
{
    private _mousePos: Vector | undefined;
    private _previousMousePos: Vector | undefined;
    private readonly _mouseForce: number;

    constructor(mouseForce: number)
    {
        this._mouseForce = mouseForce;
    }

    setup(svgData: SvgData, engine: Engine, rootBodies: Body[]): void
    {
        const world = engine.world;

        svgData.svg.addEventListener("mousemove", ev =>
        {
            this._mousePos = Vector.create(ev.offsetX, ev.offsetY);
        });

        Events.on(engine, 'afterUpdate', () =>
        {
            if (this._previousMousePos !== undefined && this._mousePos !== undefined)
            {
                const bodies = Query.point(Composite.allBodies(world), this._mousePos);
                bodies.forEach(body =>
                {
                    const direction = Vector.normalise(Vector.sub(this._mousePos!, this._previousMousePos!));
                    Body.applyForce(body, this._mousePos!, Vector.mult(direction, this._mouseForce));
                });
            }

            this._previousMousePos = this._mousePos;
        });
    }
}