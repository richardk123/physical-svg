import {PhysicsPlugin} from "../physics_plugin";
import {SvgData} from "../../base/svg_data";
import {Engine, Render, Body} from "matter-js";

export class RendererPlugin implements PhysicsPlugin
{
    private _renderer: Render | undefined;
    private _elementToAddCanvas: HTMLElement | undefined;

    constructor(elementToAddCanvas: HTMLElement | undefined)
    {
        this._elementToAddCanvas = elementToAddCanvas;
    }

    setup(svgData: SvgData, physEngine: Engine, rootBodies: Body[]): void
    {
        let renderElement = document.body;

        if (svgData.svg.parentElement != null)
        {
            renderElement = svgData.svg.parentElement;
        }

        if (this._elementToAddCanvas !== undefined)
        {
            renderElement = this._elementToAddCanvas;
        }

        // create renderer
        this._renderer = Render.create({
            element: renderElement,
            engine: physEngine,
            options: {
                wireframes: true,
                width: svgData.width,
                height: svgData.height,
                // showPositions: true,
                showAngleIndicator: false,
            },
        });

        Render.run(this._renderer);
    }


    stop(): void
    {
        if (this._renderer !== undefined)
        {
            Render.stop(this._renderer);
            this._renderer.canvas.remove();
        }
    }
}