import { UniqueValueNode } from "../base/tree";
import {
    ArcCommand,
    BezierCurveCommand,
    ClosePathCommand,
    Command,
    SimpleBezierCurveCommand,
    SinglePositionCommand
} from "./command";
import {createBoundingBox, isOverlaping} from "../base/rectangle";
import { AbstractPathParser } from "./path_parser";
import { Vector2d } from "../base/vector2d";

export class CharacterPathParser extends AbstractPathParser
{
    constructor(path: String)
    {
        super();
        
        const characterParts = path
            .replace(/(\r\n|\n|\r)/gm, "") // new lines
            .replace('\t','')              // tabs
            .replace(/\s\s+/g, ' ')        // more than one white space
            .split(/(?=[A-Z]+|[a-z]+)/)    // split by characters
            .map(cmdWithParams =>
            {
                const cmdName = cmdWithParams.charAt(0);
                const cmdParameters = this.parseParameters(cmdWithParams.substring(1, cmdWithParams.length));

                switch(cmdName)
                {
                    case "M": return new SinglePositionCommand(cmdName, cmdParameters);
                    case "L": return new SinglePositionCommand(cmdName, cmdParameters);
                    case "Z": return new ClosePathCommand(cmdName, cmdParameters);
                    case "Q": return new SimpleBezierCurveCommand(cmdName, cmdParameters);
                    case "A": return new ArcCommand(cmdName, cmdParameters);
                    case "C": return new BezierCurveCommand(cmdParameters);
                    default: throw new Error(`command ${cmdName} not implemented`);
                }
            })
            // aggregate commands by move command
            .reduce((acc, cmd) =>
            {
                if (cmd.name === 'M')
                    acc.push([cmd]);
                else
                    acc[acc.length -1].push(cmd);

                return acc;
            }, new Array<Array<Command>>);

        this._charsCommands = combineCharacterParts(characterParts);
    }

    private parseParameters(parameters: String)
    {
        if (parameters == "")
            return [];
        return parameters.trim().split(" ");
    };
}

const combineCharacterParts = (characterParts: Array<Array<Command>>) : Array<Array<Command>> =>
{
    const tree = new UniqueValueNode<number>(-1, undefined);

    // check if Character parts overlap
    for(let i = 0; i < characterParts.length; i++)
    {
        tree.getOrCreateNode(i);

        for (let j = 0; j < characterParts.length; j++)
        {
            if (i === j)
                continue;

            const characterPart = characterParts[i].reduce((acc, cmd) => acc.concat(cmd.positions), new Array<Vector2d>());
            const characterPartToCheck = characterParts[j].reduce((acc, cmd) => acc.concat(cmd.positions), new Array<Vector2d>());

            const collided = doesCharacterPartsCollide(characterPart, characterPartToCheck);

            if (collided)
                tree.changeParent(i, j);
        }
    }

    return tree.children
        .map(child => child.getValuesRecursively())
        .map(characterPartIndexes =>
        {
            return characterPartIndexes.reduce((acc, index) => acc.concat(characterParts[index]), new Array<Command>);
        });
};

const doesCharacterPartsCollide = (part: Array<Vector2d>, partContained: Array<Vector2d>): boolean =>
{
    const bb1 = createBoundingBox(part);
    const bb2 = createBoundingBox(partContained);
    return isOverlaping(bb1, bb2);
};