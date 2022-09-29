import {AggregatorBuilder} from "./api/aggregator_builder";

export const PhysicalSvg = (svg: HTMLElement): AggregatorBuilder =>
{
    return new AggregatorBuilder(svg);
}

module.exports = PhysicalSvg;