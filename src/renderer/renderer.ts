import {SvgData} from "../base/svg_data";
import {
    Command,
    CurveToCommandMadeAbsolute,
    LineToCommandMadeAbsolute,
    MoveToCommandMadeAbsolute, QuadraticCurveToCommandMadeAbsolute, SmoothCurveToCommandMadeAbsolute
} from "svg-path-parser";
import {Physics} from "../physics/physics";

export interface Renderer
{
    // function called each frame
    renderLoop(svgData: SvgData, physics: Physics): void;
}

export const serializeCommand = (command: Command): string =>
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