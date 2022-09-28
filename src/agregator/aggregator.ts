import {AllCommandTypes} from "../base/command_mapper";

export interface Aggregator
{
    /**
     * aggregate commands that belongs together
     */
    aggregate(pathCommands: AllCommandTypes[][]): AllCommandTypes[][]
}