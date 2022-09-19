import {
    ClosePathCommandMadeAbsolute,
    Command, HorizontalLineToCommandMadeAbsolute,
    LineToCommandMadeAbsolute,
    VerticalLineToCommandMadeAbsolute
} from "svg-path-parser";

// expand shorten line commands to full line commands
export const mapAndFilterCommands = (commands: Command[]): Command[] =>
{
    return commands
        .filter(command =>
        {
            return "MALHVZTQSC".includes(command.code)
        })
        .map(command =>
        {
            switch (command.code)
            {
                case 'H':
                {
                    const hLine = command as HorizontalLineToCommandMadeAbsolute;
                    return new Line(hLine.x, hLine.y, hLine.x0, hLine.y0);
                }
                case 'V':
                {
                    const vLine = command as VerticalLineToCommandMadeAbsolute;
                    return new Line(vLine.x, vLine.y, vLine.x0, vLine.y0);
                }
                case 'Z':
                {
                    const closeLine = command as ClosePathCommandMadeAbsolute;
                    return new Line(closeLine.x, closeLine.y, closeLine.x0, closeLine.y0);
                }
                default:
                {
                    return command;
                }
            }
        });
}

export class Line implements LineToCommandMadeAbsolute
{
    code: "L";
    command: "lineto";
    relative: false;
    x: number;
    x0: number;
    y: number;
    y0: number;

    constructor(x: number, y: number, x0: number, y0: number)
    {
        this.code = "L";
        this.relative = false;
        this.command = "lineto";
        this.x = x;
        this.y = y;
        this.x0 = x0;
        this.y0 = y0;
    }
}
