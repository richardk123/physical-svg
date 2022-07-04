export class UniqueValueNode<T>
{
    private _children: Array<UniqueValueNode<T>> = [];
    private readonly _value: T;
    private _parent: UniqueValueNode<T> | undefined;

    constructor(value: T, parent: UniqueValueNode<T> | undefined)
    {
        this._value = value;
        this._parent = parent;
    }

    get value(): T
    {
        return this._value;
    }

    get children(): ReadonlyArray<UniqueValueNode<T>>
    {
        return this._children;
    }

    get parent(): UniqueValueNode<T> | undefined
    {
        return this._parent;
    }

    getOrCreateNode(value: T): UniqueValueNode<T>
    {
        let node = this.getNodeByValueRecursive(value);
        
        if (node === undefined)
        {
            node = new UniqueValueNode(value, this);
            this._children.push(node);
        }
        
        return node;
    }

    changeParent(parent: T, child: T)
    {
        const parentNode = this.getOrCreateNode(parent);
        const childNode = this.getOrCreateNode(child);
        
        // remove child from previous parent
        if (childNode._parent !== undefined)
        {
            childNode._parent._children.splice(childNode._parent._children.indexOf(childNode), 1);
        }

        childNode._parent = parentNode;
        parentNode._children.push(childNode);
    }

    getValuesRecursively(): Array<T>
    {
        const result = new Array<T>();
        result.push(this._value);

        const childValues = this._children.reduce((acc, cur) => acc.concat(cur.getValuesRecursively()), new Array<T>());
        return result.concat(childValues);
    }

    private getNodeByValueRecursive(value: T): UniqueValueNode<T> | undefined
    {
        if (this.value === value)
            return this;

        return this._children
            .map(child => child.getNodeByValueRecursive(value))
            .filter(node => node !== undefined)[0];
    }

}