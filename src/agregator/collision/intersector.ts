import {AllCommandTypes} from "../../base/command_mapper";

export interface Intersector<T extends AllCommandTypes, K extends AllCommandTypes>
{
    // return true if two commands intersects
    intersects(command1: T, command2: K): boolean;

    // types that are supported by the intersector
    supportedCommandTypes(): [string[], string[]];
}