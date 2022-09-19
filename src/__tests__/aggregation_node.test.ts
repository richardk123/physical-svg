import {Line} from "../base/command_mapper";
import {AggregationNode} from "../agregator/collision/tree/aggregation_node";

test('test add child', () =>
{
    const l1 = new Line(0, 0, 5, 0);
    const l2 = new Line(0, 0, 5, 0);
    const l3 = new Line(0, 0, 5, 0);

    const node1 = new AggregationNode(l1, undefined);
    node1.addChild(l2).addChild(l3);

    expect(node1.getChildrenRecursively().length).toBe(3)
});

test('test add child node', () =>
{
    const l1 = new Line(0, 0, 5, 0);
    const l2 = new Line(0, 0, 5, 0);
    const l3 = new Line(0, 0, 5, 0);

    const node1 = new AggregationNode(l1, undefined);
    const child2 = node1.addChild(l2);
    const root = new AggregationNode(l3, undefined);
    child2.addChildNode(root);

    expect(root.getRoot()).toBe(node1);
});

test('test get root', () =>
{
    const l1 = new Line(0, 0, 5, 0);
    const l2 = new Line(0, 0, 5, 0);
    const l3 = new Line(0, 0, 5, 0);

    const node1 = new AggregationNode(l1, undefined);
    const leaf = node1.addChild(l2).addChild(l3);

    expect(leaf.getRoot()).toBe(node1);
});