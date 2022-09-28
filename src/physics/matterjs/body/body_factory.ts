import {World, Body} from "matter-js";
import {LineBody} from "./line_body";
import {PointBody} from "./point_body";
import {CurveBody} from "./curve_body";
import {ReflectionCurveBody} from "./reflection_curve_body";
import {QuadraticCurveBody} from "./quadratic_curve_body";
import {AllCommandTypes} from "../../../base/command_mapper";
import {CommandBody} from "./command_body";
import {ClosePathBody} from "./close_path_body";

export const physBodyFactory = (command: AllCommandTypes): CommandBody<AllCommandTypes> =>
{
    switch (command.code)
    {
        case "L":
        {
            return new LineBody(command);
        }
        case "M":
        {
            return new PointBody(command);
        }
        case "C":
        {
            return new CurveBody(command);
        }
        case "Q":
        {
            return new QuadraticCurveBody(command);
        }
        case "S":
        {
            return new ReflectionCurveBody(command);
        }
        case "T":
        {
            throw new Error("T not supported yet!");
        }
        case "Z":
        {
            return new ClosePathBody(command);
        }
    }
}