import {PhysicsPlugin} from "../physics_plugin";
import {SvgData} from "../../base/svg_data";
import {Body, Composite, Engine, Events, Query, Vector, World} from "matter-js";

export class ScrollPlugin implements PhysicsPlugin
{
    private readonly _force: number;
    private _previousScrollPos: Vector | undefined;
    private _scrollPos: Vector | undefined;

    constructor(force: number)
    {
        this._force = force;
    }

    setup(svgData: SvgData, physEngine: Engine, rootBodies: Body[]): void
    {
        const world = physEngine.world;

        window.onscroll = ( ev =>
        {
            this._scrollPos = Vector.create(window.scrollX, window.scrollY);
        });

        Events.on(physEngine, 'afterUpdate', () =>
        {
            if (this._scrollPos !== undefined && this._previousScrollPos !== undefined)
            {
                const bodies = Composite.allBodies(world);
                bodies.forEach(body =>
                {
                    const direction = Vector.normalise(Vector.sub(this._scrollPos!, this._previousScrollPos!));
                    Body.applyForce(body, body.position, Vector.mult(direction, this._force));
                });
            }

            this._previousScrollPos = this._scrollPos;
        });
    }
}