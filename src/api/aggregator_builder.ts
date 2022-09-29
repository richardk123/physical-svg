import {Aggregator} from "../agregator/aggregator";
import {CollisionAggregator} from "../agregator/collision_aggregator";
import {PathAggregator} from "../agregator/path_aggregator";
import {SimulationBuilder} from "./simulation_builder";

export class AggregatorBuilder
{
    private readonly _svg: HTMLElement;

    constructor(svg: HTMLElement)
    {
        this._svg = svg;
    }

    useCollisionAggregator(): SimulationBuilder
    {
        return new SimulationBuilder(new CollisionAggregator(), this._svg);
    }

    usePathAggregator(): SimulationBuilder
    {
        return new SimulationBuilder(new PathAggregator(), this._svg);
    }

    useCustomAggregator(aggregator: Aggregator): SimulationBuilder
    {
        return new SimulationBuilder(aggregator, this._svg);
    }

}