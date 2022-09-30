import {Renderer, serializeCommand} from "./renderer";
import {SvgData} from "../base/svg_data";
import {Command} from "svg-path-parser";
import {MatterJsPhysics} from "../physics/matterjs_physics";

export class ProductionRenderer implements Renderer
{
    private _stopped = false;

    renderLoop(svgData: SvgData, physics: MatterJsPhysics)
    {
        const svgPaths = Array.prototype.slice.call(svgData.svg.getElementsByTagName('path'));
        this.updateFrame(svgData, physics, svgPaths);
    }

    updateFrame(svgData: SvgData, physics: MatterJsPhysics, svgPaths: SVGPathElement[]): void
    {
        physics.update(svgData.aggregatedCommands);

        svgData!.pathCommands.forEach((commands: Command[], index: number) =>
        {
            const pathString = commands.map(serializeCommand).join(" ");
            svgPaths[index].setAttribute("d", pathString);
        });

        if (!this._stopped)
        {
            window.requestAnimationFrame((t) => this.updateFrame(svgData, physics, svgPaths));
        }
    }

    stop(): void
    {
        this._stopped = true;
    }
}