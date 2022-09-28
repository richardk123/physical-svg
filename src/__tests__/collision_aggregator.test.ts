import {Line} from "../base/command_mapper";
import {CollisionAggregator} from "../agregator/collision_aggregator";

test('test parallel lines', () =>
{
    const l1 = new Line(0, 0, 5, 0);
    const l2 = new Line(0, 1, 5, 1);

    const aggregation = new CollisionAggregator().aggregate([[l1, l2]]);

    expect(aggregation[0][0]).toBe(l1);
    expect(aggregation[0].length).toBe(1);
    expect(aggregation[1][0]).toBe(l2);
    expect(aggregation[1].length).toBe(1);
});

test('test two crossing lines', () =>
{
    const l1 = new Line(0, 0, 5, 0);
    const l2 = new Line(2, 0, 2, 5);

    const aggregation = new CollisionAggregator().aggregate([[l1, l2]]);

    expect(aggregation[0][0]).toBe(l1);
    expect(aggregation[0][1]).toBe(l2);
    expect(aggregation[0].length).toBe(2);
});

test('test tree lines', () =>
{
    const l1 = new Line(0, 0, 5, 0);
    const l2 = new Line(2, 0, 2, 5);
    const l3 = new Line(100, 100, 200, 200);

    const aggregation = new CollisionAggregator().aggregate([[l1, l2, l3]]);

    expect(aggregation[0][0]).toBe(l1);
    expect(aggregation[0][1]).toBe(l2);
    expect(aggregation[0].length).toBe(2);

    expect(aggregation[1][0]).toBe(l3);
    expect(aggregation[1].length).toBe(1);
});

