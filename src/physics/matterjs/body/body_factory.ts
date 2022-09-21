import {Shape} from "../../../base/shape/shape";
import {Command} from "svg-path-parser";
import {World} from "matter-js";
import {LineShape} from "../../../base/shape/line_shape";
import {LineBody} from "./line_body";
import {PointShape} from "../../../base/shape/point_shape";
import {PointBody} from "./point_body";
import {AbstractBody} from "./abstract_body";

export const physBodyFactory = (shape: Shape<Command>): AbstractBody<Shape<Command>> =>
{
    switch (shape.code)
    {
        case "L":
        {
            const line = shape as LineShape;
            return new LineBody(line);
        }
        case "M":
        {
            const point = shape as PointShape;
            return new PointBody(point);
        }
        default:
        {
            throw new Error(`cannot create body for shape ${shape.code}`)
        }
    }
}