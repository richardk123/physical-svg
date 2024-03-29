import {Aggregator} from "./aggregator";
import {AllCommandTypes} from "../base/command_mapper";

export class PathAggregator implements Aggregator
{
    aggregate(pathCommands: AllCommandTypes[][]): AllCommandTypes[][]
    {
        return pathCommands;
    }

}