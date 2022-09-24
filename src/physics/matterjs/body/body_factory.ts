import {Shape} from "../../../base/shape/shape";
import {Command} from "svg-path-parser";
import {World, Body} from "matter-js";
import {LineShape} from "../../../base/shape/line_shape";
import {LineBody} from "./line_body";
import {PointShape} from "../../../base/shape/point_shape";
import {PointBody} from "./point_body";
import {AbstractBody} from "./abstract_body";
import {CurveShape} from "../../../base/shape/curve_shape";
import {CurveBody} from "./curve_body";
import {ReflectionCurveBody} from "./reflection_curve_body";
import {QuadraticCurveBody} from "./quadratic_curve_body";

export const physBodyFactory = (shape: Shape<Command>, parent: Body): AbstractBody<Shape<Command>> =>
{
    switch (shape.code)
    {
        case "L":
        {
            const line = shape as LineShape;
            return new LineBody(line, parent);
        }
        case "M":
        {
            const point = shape as PointShape;
            return new PointBody(point, parent);
        }
        case "C":
        {
            const curve = shape as CurveShape;

            switch (curve.command.code)
            {
                case "Q": return new QuadraticCurveBody(curve, parent);
                case "C": return new CurveBody(curve, parent);
                case "S": return new ReflectionCurveBody(curve, parent);
                default: throw new Error(`cannot create body for shape ${shape.code} and command: ${shape.command.code}`);
            }
        }
        default:
        {
            throw new Error(`cannot create body for shape ${shape.code}`);
        }
    }
}