import {PhysicsPlugin} from "../physics_plugin";
import {SvgData} from "../../base/svg_data";
import {Engine, Render, Body} from "matter-js";

export class RendererPlugin implements PhysicsPlugin
{
    setup(svgData: SvgData, physEngine: Engine, rootBodies: Body[]): void
    {
        // create renderer
        const render = Render.create({
            element: document.body,
            engine: physEngine,
            options: {
                wireframes: true,
                width: svgData.width,
                height: svgData.height,
                // showPositions: true,
                showAngleIndicator: false,
            },
        });

        Render.run(render);
    }
}