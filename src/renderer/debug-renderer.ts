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

export class DebugRenderer implements Renderer
{
    private _prevTime = 0;
    private _pathCommands: CommandMadeAbsolute[][];
    private _aggregatedCommands: AllCommandTypes[][];
    private _svgClone: HTMLElement;
    private _svgPaths: SVGPathElement[];
    private _physics: Physics;

    constructor(svgData: SvgData, pathCommands: CommandMadeAbsolute[][], aggregatedCommands: AllCommandTypes[][])
    {
        this._pathCommands = pathCommands;
        this._aggregatedCommands = aggregatedCommands;

        this._physics = new MatterJsPhysics(svgData, aggregatedCommands);

        const svgClone = svgData.svg.cloneNode(true) as HTMLElement;
        svgClone.id = svgClone.id + "1";
        this._svgClone = svgClone;

        svgData.svg.parentElement!.append(svgClone);
        this._svgPaths = Array.prototype.slice.call(svgClone.getElementsByTagName('path'));
    }

    render(time: number)
    {
        this._prevTime = time;

        this._physics.update(this._aggregatedCommands, time);

        this._pathCommands.forEach((commands: Command[], index: number) =>
        {
            const pathString = commands.map(serializeCommand).join(" ");
            this._svgPaths[index].setAttribute("d", pathString);
        });

        window.requestAnimationFrame((t) => this.render(t));
    }
}

const serializeCommand = (command: Command): string =>
{
    switch (command.code)
    {
        case 'M':
        {
            const move = command as MoveToCommandMadeAbsolute;
            return `M ${move.x.toFixed(2)} ${move.y.toFixed(2)}`;
        }
        case 'L':
        {
            const line = command as LineToCommandMadeAbsolute;
            return `L ${line.x.toFixed(2)} ${line.y.toFixed(2)}`;
        }
        case 'Z':
        {
            return "Z";
        }
        case 'C':
        {
            const curve = command as CurveToCommandMadeAbsolute;
            return `C ${curve.x1.toFixed(2)} ${curve.y1.toFixed(2)} ${curve.x2.toFixed(2)} ${curve.y2.toFixed(2)}  ${curve.x.toFixed(2)} ${curve.y.toFixed(2)}`
        }
        case 'S':
        {
            const curve = command as SmoothCurveToCommandMadeAbsolute;
            return `S ${curve.x2.toFixed(2)} ${curve.y2.toFixed(2)}  ${curve.x.toFixed(2)} ${curve.y.toFixed(2)}`
        }
        case 'Q':
        {
            const curve = command as QuadraticCurveToCommandMadeAbsolute;
            return `Q ${curve.x1.toFixed(2)} ${curve.y1.toFixed(2)} ${curve.x.toFixed(2)} ${curve.y.toFixed(2)}`
        }
        default:
        {
            throw new Error(`no serializer found for ${command.code}`);
        }
    }
}