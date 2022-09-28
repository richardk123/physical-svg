import {Aggregator} from "../agregator/aggregator";
import {CollisionAggregator} from "../agregator/collision_aggregator";
import {PathAggregator} from "../agregator/path_aggregator";
import {RenderBuilder} from "./render_builder";
import {PhysicBuilder} from "./physics_builder";

export class AggregatorBuilder
{
    private readonly _svg: HTMLElement;

    constructor(svg: HTMLElement)
    {
        this._svg = svg;
    }

    useCollisionAggregator(): PhysicBuilder
    {
        return new PhysicBuilder(new CollisionAggregator(), this._svg);
    }

    usePathAggregator(): PhysicBuilder
    {
        return new PhysicBuilder(new PathAggregator(), this._svg);
    }

    useCustomAggregator(aggregator: Aggregator): PhysicBuilder
    {
        return new PhysicBuilder(aggregator, this._svg);
    }

}