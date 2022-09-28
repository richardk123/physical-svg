import {
    ClosePathCommandMadeAbsolute,
    Command, CommandMadeAbsolute,
    CurveToCommandMadeAbsolute,
    HorizontalLineToCommandMadeAbsolute,
    LineToCommandMadeAbsolute, MoveToCommandMadeAbsolute,
    QuadraticCurveToCommandMadeAbsolute,
    SmoothCurveToCommandMadeAbsolute, SmoothQuadraticCurveToCommandMadeAbsolute,
    VerticalLineToCommandMadeAbsolute
} from "svg-path-parser";
import {findLengthOfLineCommand} from "./command_utils";

export type AllCommandTypes = (CurveCommandType | LineCommandType | MoveToCommandMadeAbsolute);

export type CurveCommandType = (CurveToCommandMadeAbsolute |
    SmoothCurveToCommandMadeAbsolute |
    QuadraticCurveToCommandMadeAbsolute |
    SmoothQuadraticCurveToCommandMadeAbsolute);

export type LineCommandType = (LineToCommandMadeAbsolute | ClosePathCommandMadeAbsolute);

// expand shorten line commands to full line commands
export const expandCommands = (commands: CommandMadeAbsolute[]): AllCommandTypes[] =>
{
    return commands
        .filter(command =>
        {
            switch (command.code)
            {
                case 'Z':
                {
                    // filter Z commands that don't have length
                    if (findLengthOfLineCommand(command) === 0)
                    {
                        return false;
                    }
                }
                default: return true;
            }
        })
        .map(command =>
        {
            switch (command.code)
            {
                case 'H':
                {
                    return new Line(command.x, command.y, command.x0, command.y0);
                }
                case 'V':
                {
                    return new Line(command.x, command.y, command.x0, command.y0);
                }
                case "A":
                {
                    throw new Error("A not supported yet");
                }
                default:
                {
                    return command;
                }
            }
        })
}

export class Line implements LineToCommandMadeAbsolute
{
    code: 'L';
    command: "lineto";
    relative: false;
    x: number;
    x0: number;
    y: number;
    y0: number;

    constructor(x: number, y: number, x0: number, y0: number)
    {
        this.code = 'L';
        this.relative = false;
        this.command = "lineto";
        this.x = x;
        this.y = y;
        this.x0 = x0;
        this.y0 = y0;
    }
}