import {
    Command,
    LineToCommandMadeAbsolute, MoveToCommandMadeAbsolute
} from "svg-path-parser";
import {Shape} from "./shape/shape";
import {Line} from "./command_mapper";
import {LineShape} from "./shape/line_shape";
import {SvgData} from "./svg_data";
import {PointShape} from "./shape/point_shape";

export const mapCommandsToShape = (commands: Command[], svgData: SvgData): Shape[] =>
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
                default:
                {
                    throw new Error(`cannot map command ${command.code} to shape`);
                }
            }
        });
}