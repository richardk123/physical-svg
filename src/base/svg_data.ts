import {CommandMadeAbsolute} from "svg-path-parser";
import {AllCommandTypes} from "./command_mapper";

export class SvgData
{
    readonly _svg: HTMLElement;
    readonly _strokeWidth: number;
    readonly _width: number;
    readonly _height: number;

    readonly _viewBox: {minx: number, miny: number; width: number, height: number} | undefined;

    readonly _pathCommands: CommandMadeAbsolute[][];
    readonly _aggregatedCommands: AllCommandTypes[][];

    constructor(svg: HTMLElement, pathCommands: CommandMadeAbsolute[][], aggregatedCommands: AllCommandTypes[][])
    {
        this._svg = svg;
        // this._strokeWidth = Number(svg.getAttribute("stroke-width")!.toLowerCase().replace("px", ""));
        this._strokeWidth = 15;
        this._width = svg.clientWidth;
        this._height = svg.clientHeight;

        this._pathCommands = pathCommands;
        this._aggregatedCommands = aggregatedCommands;

        const viewBoxString = svg.getAttribute("viewBox");
        if (viewBoxString === null)
        {
            return;
        }
        const values = viewBoxString.split(/[ ,]/).filter(Boolean).map(Number);

        this._viewBox = {minx: values[0], miny: values[1], width: values[2], height: values[3]};
    }

    get pathCommands(): CommandMadeAbsolute[][]
    {
        return this._pathCommands;
    }

    get aggregatedCommands(): AllCommandTypes[][]
    {
        return this._aggregatedCommands;
    }

    get svg(): HTMLElement
    {
        return this._svg;
    }

    get width(): number
    {
        return this._width;
    }

    get height(): number
    {
        return this._height;
    }

    get viewBox(): {minx: number, miny: number; width: number, height: number} | undefined
    {
        return this._viewBox;
    }

    // TODO: calculate
    get relativeStrokeWidth(): number
    {
        return this._strokeWidth;
    }
}