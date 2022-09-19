import {Line} from "../base/command_mapper";
import {AggregationTree} from "../agregator/collision/tree/aggregation_tree";

test('test get all nodes', () =>
{
    const l1 = new Line(0, 0, 5, 0);
    const l2 = new Line(0, 0, 5, 0);
    const l3 = new Line(0, 0, 5, 0);

    const tree = new AggregationTree(() => true);
    tree.addValue(l1);
    tree.addValue(l2);
    tree.addValue(l3);

    expect(tree.getAllNodes().length).toBe(3)
});

test('test non colliding structure', () =>
{
    const l1 = new Line(0, 0, 5, 0);
    const l2 = new Line(0, 0, 5, 0);
    const l3 = new Line(0, 0, 5, 0);

    const tree = new AggregationTree(() => false);
    tree.addValue(l1);
    tree.addValue(l2);
    tree.addValue(l3);

    expect(tree.getAggregatedCommands().length).toBe(3)
});