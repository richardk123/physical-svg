import {Body} from "matter-js";
import {AllCommandTypes} from "../../base/command_mapper";

export interface CommandBody<T extends AllCommandTypes>
{

    // set values back to svg command
    updateSvgCommand(): void

    // return physics body
    get bodies(): Body[];
}
