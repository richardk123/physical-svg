import {LineBody} from "./line_body";
import {PointBody} from "./point_body";
import {CurveBody} from "./curve_body";
import {ReflectionCurveBody} from "./reflection_curve_body";
import {QuadraticCurveBody} from "./quadratic_curve_body";
import {AllCommandTypes} from "../../base/command_mapper";
import {CommandBody} from "./command_body";
import {ClosePathBody} from "./close_path_body";

export const physBodyFactory = (command: AllCommandTypes, colliderSize: number): CommandBody<AllCommandTypes> =>
{
    switch (command.code)
    {
        case "L":
        {
            return new LineBody(command, colliderSize);
        }
        case "M":
        {
            return new PointBody(command);
        }
        case "C":
        {
            return new CurveBody(command, colliderSize);
        }
        case "Q":
        {
            return new QuadraticCurveBody(command, colliderSize);
        }
        case "S":
        {
            return new ReflectionCurveBody(command, colliderSize);
        }
        case "T":
        {
            throw new Error("T not supported yet!");
        }
        case "Z":
        {
            return new ClosePathBody(command);
        }
        case "A":
        {
            throw new Error("arc command not implemented yet");
        }
    }
}