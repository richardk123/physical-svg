import { v4 as uuidv4 } from 'uuid';

export class AggregationNode<T>
{
    private _parent: AggregationNode<T> | undefined;
    private _value: T;
    private _children: AggregationNode<T>[];
    private _id: string;

    constructor(value: T, parent: AggregationNode<T> | undefined)
    {
        this._id = uuidv4();
        this._parent = parent;
        this._value = value;
        this._children = [];
    }

    get id(): string
    {
        return this._id;
    }

    get value(): T
    {
        return this._value;
    }

    addChild(value: T): AggregationNode<T>
    {
        const node = new AggregationNode(value, this);
        node._parent = this;
        this._children.push(node);
        return node;
    }

    addChildNode(node: AggregationNode<T>): AggregationNode<T>
    {
        node._parent = this;
        this._children.push(node);
        return node;
    }

    getChildrenRecursively(): AggregationNode<T>[]
    {
        const children = new Array<AggregationNode<T>>(this);
        this._children.forEach(child =>
        {
            child.getChildrenRecursively().forEach(subChild =>
            {
                children.push(subChild);
            })
        });

        return children;
    }

    getRoot(): AggregationNode<T>
    {
        if (this._parent === undefined)
        {
            return this;
        }
        return this._parent.getRoot();
    }
}