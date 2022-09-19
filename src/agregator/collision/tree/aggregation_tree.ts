import {AggregationNode} from "./aggregation_node";

export class AggregationTree<T>
{
    private _roots: AggregationNode<T>[];
    private _aggregationFcn: (cmd1: T, cmd2: T) => boolean;

    constructor(aggregationFcn: (cmd1: T, cmd2: T) => boolean)
    {
        this._roots = [];
        this._aggregationFcn = aggregationFcn;
    }

    getAggregatedCommands(): T[][]
    {
        return this._roots.map(root =>
        {
            return root.getChildrenRecursively().map(node => node.value);
        });
    }

    addValue(value: T)
    {
        if (this._roots.length === 0)
        {
            this._roots.push(new AggregationNode(value, undefined));
        }
        else
        {
            const nodesCollided = this.getAllNodes()
                .filter(node => this._aggregationFcn(node.value, value));

            // did not collide with anything
            if (nodesCollided.length === 0)
            {
                // add as root
                this._roots.push(new AggregationNode(value, undefined));
            }
            else
            {
                const addedNode = nodesCollided[0].addChild(value);
                nodesCollided.slice(1, nodesCollided.length)
                    .map(node => node.getRoot())
                    .filter(root => root.id !== addedNode.getRoot().id)
                    .filter((node, index, self) =>
                            index === self.findIndex((t) => (t.id === node.id))
                    )
                    .forEach(root =>
                    {
                        addedNode.addChildNode(root);
                        this._roots.splice(this._roots.indexOf(root), 1);
                    });
            }
        }
    }

    getAllNodes(): AggregationNode<T>[]
    {
        return this._roots.flatMap((node) => node.getChildrenRecursively());
    }
}