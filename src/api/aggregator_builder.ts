import {Aggregator} from "../agregator/aggregator";
import {CollisionAggregator} from "../agregator/collision_aggregator";
import {NoAggregator} from "../agregator/no_aggregator";
import {StarterBuilder} from "./starter_builder";

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

    useNoAggregator(): StarterBuilder
    {
        this._aggregator = new NoAggregator();
        return new StarterBuilder(this);
    }

    useCustomAggregator(aggregator: Aggregator): StarterBuilder
    {
        this._aggregator = aggregator;
        return new StarterBuilder(this);
    }

}