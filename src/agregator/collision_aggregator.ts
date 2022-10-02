import {Intersector} from "./collision/intersector";
import {Command} from "svg-path-parser";
import {Aggregator} from "./aggregator";
import {LineLineIntersector} from "./collision/line_line_intersector";
import {AggregationTree} from "./collision/tree/aggregation_tree";
import {LinePointIntersector} from "./collision/line_point_intersector";
import {LineCurveIntersector} from "./collision/line_curve_intersector";
import {CurveCurveIntersector} from "./collision/curve_curve_intersector";
import {CurvePointIntersector} from "./collision/curve_point_intersector";
import {PointPointIntersector} from "./collision/point_point_intersector";
import {AllCommandTypes} from "../base/command_mapper";
import {ArcArcIntersector} from "./collision/arc_arc_intersector";
import {ArcCurveIntersector} from "./collision/arc_curve_intersector";
import {ArcLineIntersector} from "./collision/arc_line_intersector";
import {ArcPointIntersector} from "./collision/arc_point_intersector";

export class CollisionAggregator implements Aggregator
{
    private _intersectorRegistry: Intersector<AllCommandTypes, AllCommandTypes>[];

    constructor()
    {
        this._intersectorRegistry = [new LineLineIntersector(), new LinePointIntersector(),
            new LineCurveIntersector(), new CurveCurveIntersector(), new CurvePointIntersector(), new PointPointIntersector(),
            new ArcArcIntersector(), new ArcCurveIntersector(), new ArcLineIntersector(), new ArcPointIntersector()];
    }

    // aggregate commands together if they intersect
    aggregate(pathCommands: AllCommandTypes[][]): AllCommandTypes[][]
    {
        const flatCommands = pathCommands
            .flatMap(commands => commands);

        const aggregationTree = new AggregationTree<AllCommandTypes>(
            (shape1, shape2) => this.intersect(shape1, shape2, this._intersectorRegistry));

        flatCommands.forEach(command =>
        {
            aggregationTree.addValue(command);
        });

        return aggregationTree.getAggregatedCommands();
    }

    // find intersector for two commands and call it
    private intersect(cmd1: AllCommandTypes, cmd2: AllCommandTypes, registry: Intersector<AllCommandTypes, AllCommandTypes>[]): boolean
    {
        const matchingIntersector = registry.find(intersector =>
        {
            const cmdType = intersector.supportedCommandTypes();
            return (cmdType[0].includes(cmd1.code) && cmdType[1].includes(cmd2.code)) ||
                (cmdType[1].includes(cmd1.code) && cmdType[0].includes(cmd2.code));
        });

        if (matchingIntersector === undefined)
        {
            throw new Error(`intersector not defined for types ${cmd1.code} ${cmd2.code}`);
        }

        if (matchingIntersector.supportedCommandTypes()[0].includes(cmd1.code))
        {
            return matchingIntersector.intersects(cmd1, cmd2);
        }
        else
        {
            return matchingIntersector.intersects(cmd2, cmd1);
        }
    }
}