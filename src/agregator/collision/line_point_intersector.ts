import {Intersector} from "./intersector";
import {ClosePathCommandMadeAbsolute, LineToCommandMadeAbsolute, MoveToCommandMadeAbsolute} from "svg-path-parser";
import {LineCommandType} from "../../base/command_mapper";
import {findLengthOfLineCommand} from "../../base/command_utils";

export class LinePointIntersector implements Intersector<LineCommandType, MoveToCommandMadeAbsolute>
{
    intersects(line: LineCommandType, point: MoveToCommandMadeAbsolute): boolean
    {
        const a = {x: line.x, y: line.y};
        const b = {x: line.x0, y: line.y0};
        const c = {x: point.x, y: point.y};
        const crossProduct = (c.y - a.y) * (b.x - a.x) - (c.x - a.x) * (b.y - a.y)

        // compare versus epsilon for floating point values, or != 0 if using integers
        if (Math.abs(crossProduct) > 1e-10)
        {
            return false;
        }

        const dotProduct = (c.x - a.x) * (b.x - a.x) + (c.y - a.y)*(b.y - a.y)
        if (dotProduct < 0)
        {
            return false;
        }

        const squaredLengthBA = (b.x - a.x)*(b.x - a.x) + (b.y - a.y)*(b.y - a.y)
        return dotProduct <= squaredLengthBA;
    }

    supportedCommandTypes(): [string[], string[]]
    {
        return [["L", "Z"], ["M"]];
    }

}