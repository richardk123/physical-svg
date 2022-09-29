import {SvgData} from "../base/svg_data";
import {Renderer, serializeCommand} from "./renderer";
import {MatterJsPhysics} from "../physics/matterjs_physics";
import {Command} from "svg-path-parser";

export class DebugRenderer implements Renderer
{
    renderLoop(svgData: SvgData, physics: MatterJsPhysics)
    {
        const svgClone = svgData.svg.cloneNode(true) as HTMLElement;
        svgClone.id = svgClone.id + "1";
        svgData.svg.parentElement!.append(svgClone);

        const svgPaths = Array.prototype.slice.call(svgData.svg.getElementsByTagName('path'));
        this.updateFrame(svgData, physics, svgPaths);
    }

    updateFrame(svgData: SvgData, physics: MatterJsPhysics, svgPaths: SVGPathElement[]): void
    {
        physics.update(svgData.aggregatedCommands);

        svgData.pathCommands.forEach((commands: Command[], index: number) =>
        {
            const pathString = commands.map(serializeCommand).join(" ");
            svgPaths[index].setAttribute("d", pathString);
        });

        window.requestAnimationFrame((t) => this.updateFrame(svgData, physics, svgPaths));
    }
}
