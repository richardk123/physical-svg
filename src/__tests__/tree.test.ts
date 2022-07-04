import { UniqueValueNode } from "../base/tree";

test('create node', () => 
{
  const tree = new UniqueValueNode<number>(0, undefined);
  expect(tree.children.length).toBe(0);
  expect(tree.parent).toBe(undefined);
});

test('get node', () => 
{
  const tree = new UniqueValueNode<number>(0, undefined);
  tree.getOrCreateNode(1);
  tree.getOrCreateNode(2);

  tree.changeParent(1, 2);

  const node = tree.getOrCreateNode(2);

  expect(node.parent?.value).toBe(1);
});

test('create children', () =>
{
  const tree = new UniqueValueNode<number>(0, undefined);
  const newNode1 = tree.getOrCreateNode(1);
  const newNode2 = tree.getOrCreateNode(2);

  expect(tree.children[0]).toStrictEqual(newNode1);
  expect(tree.children[1]).toStrictEqual(newNode2);
});

test('change parent', () =>
{
  const tree = new UniqueValueNode<number>(0, undefined);
  const newNode1 = tree.getOrCreateNode(1);
  const newNode2 = tree.getOrCreateNode(2);

  tree.changeParent(1, 2);

  expect(newNode1.children[0]).toStrictEqual(newNode2);
});

test('get all values', () =>
{
  const tree = new UniqueValueNode<number>(0, undefined);
  tree.getOrCreateNode(1);
  tree.getOrCreateNode(2);

  tree.changeParent(1, 2);

  expect(tree.getValuesRecursively()).toStrictEqual([0, 1, 2]);
});