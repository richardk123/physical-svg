import {Command, LineToCommandMadeAbsolute, MoveToCommandMadeAbsolute} from "svg-path-parser";
import {Shape} from "../base/shape/shape";

export class DebugRenderer implements Renderer
{
    private _prevTime = 0;
    private _pathCommands: Command[][];
    private _shapes: Shape[];
    private _svgPaths: SVGPathElement[];

    constructor(svg: HTMLElement, pathCommands: Command[][], shapes: Shape[])
    {
        this._pathCommands = pathCommands;

        const svgClone = svg.cloneNode(true) as HTMLElement;
        svgClone.id = svgClone.id + "1";
        svg.parentElement!.append(svgClone);
        this._shapes = shapes;
        this._svgPaths = Array.prototype.slice.call(svgClone.getElementsByTagName('path'));
    }

    render(time: number)
    {
        this._prevTime = time;

        // todo: physics with aggregated shapes
        this._shapes.forEach(shape =>
        {
            switch (shape.code)
            {
                case 'M':
                {
                    const cmd = shape.command as MoveToCommandMadeAbsolute;
                    cmd.x = cmd.x + 1;
                }
            }
        })

        this._pathCommands.forEach((commands: Command[], index: number) =>
        {
            const pathString = commands.map(commandSerializer).join(" ");
            this._svgPaths[index].setAttribute("d", pathString);
        })
        window.requestAnimationFrame((t) => this.render(t));
    }
}

const commandSerializer = (command: Command): string =>
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
        default:
        {
            throw new Error(`no serializer found for ${command.code}`);
        }
    }
}