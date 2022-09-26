import {Line} from "../base/command_mapper";
import {CollisionAggregator} from "../agregator/collision_aggregator";
import {mapCommandsToShape} from "../base/shape/shape_mapper";
import {SvgData} from "../base/svg_data";

test('test parallel lines', () =>
{
    const l1 = new Line(0, 0, 5, 0);
    const l2 = new Line(0, 1, 5, 1);

    const shapes = mapCommandsToShape([l1, l2], new TestSvgData());
    const aggregation = new CollisionAggregator().aggregate(shapes);

    expect(aggregation[0][0].command).toBe(l1);
    expect(aggregation[0].length).toBe(1);
    expect(aggregation[1][0].command).toBe(l2);
    expect(aggregation[1].length).toBe(1);
});

test('test two crossing lines', () =>
{
    const l1 = new Line(0, 0, 5, 0);
    const l2 = new Line(2, 0, 2, 5);

    const shapes = mapCommandsToShape([l1, l2], new TestSvgData());
    const aggregation = new CollisionAggregator().aggregate(shapes);

    expect(aggregation[0][0].command).toBe(l1);
    expect(aggregation[0][1].command).toBe(l2);
    expect(aggregation[0].length).toBe(2);
});

test('test tree lines', () =>
{
    const l1 = new Line(0, 0, 5, 0);
    const l2 = new Line(2, 0, 2, 5);
    const l3 = new Line(100, 100, 200, 200);

    const shapes = mapCommandsToShape([l1, l2, l3], new TestSvgData());
    const aggregation = new CollisionAggregator().aggregate(shapes);

    expect(aggregation[0][0].command).toBe(l1);
    expect(aggregation[0][1].command).toBe(l2);
    expect(aggregation[0].length).toBe(2);

    expect(aggregation[1][0].command).toBe(l3);
    expect(aggregation[1].length).toBe(1);
});

export class TestSvgData extends SvgData
{
    constructor()
    {
        super(document.createElement("div"));
    }

}

