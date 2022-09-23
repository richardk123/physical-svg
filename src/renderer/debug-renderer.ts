import {
    Command,
    CurveToCommandMadeAbsolute,
    LineToCommandMadeAbsolute,
    MoveToCommandMadeAbsolute
} from "svg-path-parser";
import {Shape} from "../base/shape/shape";
import {Physics} from "../physics/physics";
import {MatterJsPhysics} from "../physics/matterjs_physics";

export class DebugRenderer implements Renderer
{
    private _prevTime = 0;
    private _pathCommands: Command[][];
    private _shapes: Shape<Command>[][];
    private _svgClone: HTMLElement;
    private _svgPaths: SVGPathElement[];
    private _physics: Physics;

    constructor(svg: HTMLElement, pathCommands: Command[][], shapes: Shape<Command>[][])
    {
        this._pathCommands = pathCommands;
        this._shapes = shapes;

        this._physics = new MatterJsPhysics();
        this._physics.init(shapes);

        const svgClone = svg.cloneNode(true) as HTMLElement;
        svgClone.id = svgClone.id + "1";
        this._svgClone = svgClone;

        svg.parentElement!.append(svgClone);
        this._svgPaths = Array.prototype.slice.call(svgClone.getElementsByTagName('path'));
    }

    render(time: number)
    {
        this._prevTime = time;

        // clear debug
        const circles = Array.prototype.slice.call(this._svgClone.getElementsByTagName("circle"));
        circles.forEach(circle => this._svgClone.removeChild(circle));

        this._physics.update(this._shapes, time);

        this._pathCommands.forEach((commands: Command[], index: number) =>
        {
            const pathString = commands.map(serializeCommand).join(" ");
            this._svgPaths[index].setAttribute("d", pathString);
        });
        //
        // this._pathCommands.forEach((commands: Command[]) =>
        // {
        //     commands.forEach(command => debugRender(command, this._svgClone));
        // });

        window.requestAnimationFrame((t) => this.render(t));
    }
}

const debugRender = (command: Command, svg: HTMLElement): void =>
{
    switch (command.code)
    {
        case 'M':
        {
            renderPoint({x: command.x, y: command.y}, svg, "red");
            break;
        }
        case 'L':
        {
            renderPoint({x: command.x, y: command.y}, svg, "black");
            break;
        }
        case 'C':
        {
            renderPoint({x: command.x, y: command.y}, svg, "red");
            renderPoint({x: command.x1, y: command.y1}, svg, "purple");
            renderPoint({x: command.x2, y: command.y2}, svg, "purple");
            break;
        }
        case 'Z':
        {
            break;
        }
        default:
        {
            throw new Error(`no debug renderer found for ${command.code}`);
        }
    }
}

const renderPoint = (point: {x: number, y: number}, svg: HTMLElement, color: string, size?: string): void =>
{
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", point.x.toFixed(2));
    circle.setAttribute("cy", point.y.toFixed(2));
    if (size === undefined)
    {
        circle.setAttribute("r", "5");
    }
    else
    {
        circle.setAttribute("r", size);
    }
    circle.setAttribute("stroke", "black");
    circle.setAttribute("stroke-width", "0");
    circle.setAttribute("fill", color);
    svg.appendChild(circle);
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
        default:
        {
            throw new Error(`no serializer found for ${command.code}`);
        }
    }
}