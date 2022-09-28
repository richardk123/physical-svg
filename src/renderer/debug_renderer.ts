import {
    Command, CommandMadeAbsolute,
    CurveToCommandMadeAbsolute,
    LineToCommandMadeAbsolute,
    MoveToCommandMadeAbsolute, QuadraticCurveToCommandMadeAbsolute, SmoothCurveToCommandMadeAbsolute
} from "svg-path-parser";
import {Physics} from "../physics/physics";
import {MatterJsPhysics} from "../physics/matterjs_physics";
import {SvgData} from "../base/svg_data";
import {AllCommandTypes} from "../base/command_mapper";
import {Renderer, serializeCommand} from "./renderer";

export class DebugRenderer implements Renderer
{
    renderLoop(svgData: SvgData, physics: Physics)
    {
        physics.debugRenderLoop(svgData);

        const svgClone = svgData.svg.cloneNode(true) as HTMLElement;
        svgClone.id = svgClone.id + "1";
        svgData.svg.parentElement!.append(svgClone);
        const svgPaths = Array.prototype.slice.call(svgClone.getElementsByTagName('path'));

        this.updateFrame(svgData, physics, svgPaths);
    }

    updateFrame(svgData: SvgData, physics: Physics, svgPaths: SVGPathElement[]): void
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
