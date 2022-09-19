import {Intersector} from "./collision/intersector";
import {Command} from "svg-path-parser";
import {Aggregator} from "./aggregator";
import {LineLineIntersector} from "./collision/line_line_intersector";
import {AggregationTree} from "./collision/tree/aggregation_tree";
import {Shape} from "../base/shape/shape";
import {LinePointIntersector} from "./collision/line_point_intersector";
import {LineCurveIntersector} from "./collision/line_curve_intersector";
import {CurveCurveIntersector} from "./collision/curve_curve_intersector";
import {CurvePointIntersector} from "./collision/curve_point_intersector";
import {PointPointIntersector} from "./collision/point_point_intersector";

export class CollisionAggregator implements Aggregator
{
    private _intersectorRegistry: Intersector<Shape<Command>, Shape<Command>>[];

    constructor()
    {
        this._intersectorRegistry = [new LineLineIntersector(), new LinePointIntersector(),
            new LineCurveIntersector(), new CurveCurveIntersector(), new CurvePointIntersector(), new PointPointIntersector()];
    }

    // aggregate commands together if they intersect
    aggregate(shapes: Shape<Command>[]): Shape<Command>[][]
    {
        const aggregationTree = new AggregationTree<Shape<Command>>(
            (shape1, shape2) => this.intersect(shape1, shape2, this._intersectorRegistry));

        shapes.forEach(shape =>
        {
            aggregationTree.addValue(shape);
        });

        return aggregationTree.getAggregatedCommands();
    }

    // find intersector for two commands and call it
    intersect(shape1: Shape<Command>, shape2: Shape<Command>, registry: Intersector<Shape<Command>, Shape<Command>>[]): boolean
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