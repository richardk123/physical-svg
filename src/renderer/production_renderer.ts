import {Renderer, serializeCommand} from "./renderer";
import {SvgData} from "../base/svg_data";
import {Command} from "svg-path-parser";
import {Physics} from "../physics/physics";

export class ProductionRenderer implements Renderer
{
    renderLoop(svgData: SvgData, physics: Physics)
    {
        const svgPaths = Array.prototype.slice.call(svgData.svg.getElementsByTagName('path'));

        this.updateFrame(svgData, physics, svgPaths);
    }

    updateFrame(svgData: SvgData, physics: Physics, svgPaths: SVGPathElement[]): void
    {
        physics.update(svgData.aggregatedCommands);

        svgData!.pathCommands.forEach((commands: Command[], index: number) =>
        {
            const pathString = commands.map(serializeCommand).join(" ");
            svgPaths[index].setAttribute("d", pathString);
        });

        window.requestAnimationFrame((t) => this.updateFrame(svgData, physics, svgPaths));
    }
}