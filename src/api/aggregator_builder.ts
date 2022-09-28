import {Aggregator} from "../agregator/aggregator";
import {CollisionAggregator} from "../agregator/collision_aggregator";
import {StarterBuilder} from "./starter_builder";
import {PathAggregator} from "../agregator/path_aggregator";

export class AggregatorBuilder
{
    _svg: HTMLElement;
    _aggregator: Aggregator

    constructor(svg: HTMLElement)
    {
        this._svg = svg;
        this._aggregator = new CollisionAggregator();
    }

    useCollisionAggregator(): StarterBuilder
    {
        this._aggregator = new CollisionAggregator();
        return new StarterBuilder(this);
    }

    usePathAggregator(): StarterBuilder
    {
        this._aggregator = new PathAggregator();
        return new StarterBuilder(this);
    }

    useCustomAggregator(aggregator: Aggregator): StarterBuilder
    {
        this._aggregator = aggregator;
        return new StarterBuilder(this);
    }

}