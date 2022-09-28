import {Aggregator} from "./aggregator";
import {AllCommandTypes} from "../base/command_mapper";

export class NoAggregator implements Aggregator
{
    aggregate(pathCommands: AllCommandTypes[][]): AllCommandTypes[][]
    {
        return pathCommands.flatMap(commands => commands).map(shape => [shape]);
    }
}