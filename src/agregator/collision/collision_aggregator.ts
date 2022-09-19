import {Intersector} from "./intersector";
import {Command} from "svg-path-parser";
import {Aggregator} from "../aggregator";
import {LineSegmentIntersector} from "./line_segment_intersector";
import {AggregationTree} from "./tree/aggregation_tree";
import {Shape} from "../../base/shape/shape";
import {LineSegmentPointIntersector} from "./line_segment_point_intersector";

export class CollisionAggregator implements Aggregator
{
    private _intersectorRegistry: Intersector<Shape, Shape>[];

    constructor()
    {
        this._intersectorRegistry = [new LineSegmentIntersector(), new LineSegmentPointIntersector()];
    }

    // aggregate commands together if they intersect
    aggregate(shapes: Shape[]): Shape[][]
    {
        const aggregationTree = new AggregationTree<Shape>(
            (shape1, shape2) => this.intersect(shape1, shape2, this._intersectorRegistry));

        shapes.forEach(shape =>
        {
            aggregationTree.addValue(shape);
        });

        return aggregationTree.getAggregatedCommands();
    }

    // find intersector for two commands and call it
    intersect(shape1: Shape, shape2: Shape, registry: Intersector<Shape, Shape>[]): boolean
    {
        const matchingIntersector = registry.find(intersector =>
        {
            const cmdType = intersector.supportedShapeTypes();
            return (shape1.code === cmdType[0] && shape2.code === cmdType[1]) ||
                (shape1.code === cmdType[1] && shape2.code === cmdType[0]);
        });

        if (matchingIntersector === undefined)
        {
            throw new Error(`intersector not defined for types ${shape1.code} ${shape2.code}`);
        }

        if (matchingIntersector.supportedShapeTypes()[0] === shape1.code)
        {
            return matchingIntersector.intersects(shape1, shape2);
        }
        else
        {
            return matchingIntersector.intersects(shape2, shape1);
        }
    }
}