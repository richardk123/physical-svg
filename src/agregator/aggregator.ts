import {
    Command, CurveToCommandMadeAbsolute,
    EllipticalArcCommand,
    EllipticalArcCommandMadeAbsolute,
    HorizontalLineToCommandMadeAbsolute,
    LineToCommand,
    LineToCommandMadeAbsolute,
    QuadraticCurveToCommandMadeAbsolute, SmoothCurveToCommandMadeAbsolute,
    SmoothQuadraticCurveToCommandMadeAbsolute,
    VerticalLineToCommandMadeAbsolute
} from "svg-path-parser";
import {LineSegmentIntersector} from "./collision/line_segment_intersector";
import {Intersector} from "./collision/intersector";
import {Shape} from "../base/shape/shape";

export interface Aggregator
{
    /**
     * aggregate commands that belongs together
     */
    aggregate(shapes: Shape[]): Shape[][]
}