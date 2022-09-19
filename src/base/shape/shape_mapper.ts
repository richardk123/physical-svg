import {
    Command, CurveToCommandMadeAbsolute,
    LineToCommandMadeAbsolute, MoveToCommandMadeAbsolute
} from "svg-path-parser";
import {Shape} from "./shape";
import {Line} from "../command_mapper";
import {LineShape} from "./line_shape";
import {SvgData} from "../svg_data";
import {PointShape} from "./point_shape";
import {CurveShape} from "./curve_shape";

export const mapCommandsToShape = (commands: Command[], svgData: SvgData): Shape<Command>[] =>
{
    return commands
        .filter(command =>
        {
            return "MALTQSC".includes(command.code)
        })
        .map(command =>
        {
            switch (command.code)
            {
                case 'M':
                {
                    const move = command as MoveToCommandMadeAbsolute;
                    return new PointShape(move, svgData);
                }
                case 'L':
                {
                    const line = command as LineToCommandMadeAbsolute;
                    return new LineShape(line, svgData);
                }
                case 'C':
                {
                    const curve = command as CurveToCommandMadeAbsolute;
                    return new CurveShape(curve, svgData);
                }
                default:
                {
                    throw new Error(`cannot map command ${command.code} to shape`);
                }
            }
        });
}