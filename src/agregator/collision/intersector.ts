import {Command} from "svg-path-parser";
import {Shape} from "../../base/shape/shape";

export interface Intersector<T extends Shape, K extends Shape>
{
    // return true if two commands intersects
    intersects(shape1: T, shape2: K): boolean;

    // types that are supported by the intersector
    supportedShapeTypes(): [string, string];
}