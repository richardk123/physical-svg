import {AggregatorBuilder} from "./api/aggregator_builder";
import {StopPhysicalSvg} from "./api/stop_builder";

export const PhysicalSvg = (svg: HTMLElement): AggregatorBuilder =>
{
    return new AggregatorBuilder(svg);
}

export {StopPhysicalSvg};