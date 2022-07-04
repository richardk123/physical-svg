import { Vector2d } from "../base/vector2d";
import {Command} from "./command";

export interface PathParser
{
    serialize(updatePositions: (positions: Array<Vector2d>, characterIndex: number) => Array<Vector2d>): string;
}

export abstract class AbstractPathParser
{
    protected _charsCommands: Array<Array<Command>> = [];

    serialize(updatePositions: (positions: Array<Vector2d>, characterIndex: number) => Array<Vector2d>): string
    {
        // update commands with new positions
        return this._charsCommands.map((charCmds, index) =>
        {
            let positions = charCmds.reduce((acc: Array<Vector2d>, cmd: Command) => acc.concat(cmd.positions), []);

            positions = updatePositions(positions, index);

            let positionIndex = 0;
            charCmds.forEach(cmd =>
            {
                const updatedCmdPositions = positions.slice(positionIndex, positionIndex + cmd.numberOfPositions);
                cmd.positions = updatedCmdPositions;
                positionIndex += cmd.numberOfPositions;
            });

            return charCmds;
        })
        .reduce((serialized, character) =>
        {
            return serialized + character.map(cmd => cmd.serialize()).join(" ");
        }, "");
    }
}