export class Vector2d
{
    private readonly _x : number;
    private readonly _y : number;
    
    constructor (x : number, y: number)
    {
        this._x = x;
        this._y = y;
    }

    public get x(): number
    {
        return this._x;
    }

    public get y(): number
    {
        return this._y;
    }

    public unit(): Vector2d
    {
        const length = this.length();
        return new Vector2d(this._x / length, this._y / length);
    }

    public opposite(): Vector2d
    {
        return new Vector2d(-this._x, -this._y);
    }

    public multiply(length: number): Vector2d
    {
        return new Vector2d(this.x * length, this.y * length);
    }

    public divide(length: number): Vector2d
    {
        return new Vector2d(this.x / length, this.y / length);
    }

    public add(vector: Vector2d): Vector2d
    {
        return new Vector2d(vector.x + this.x, vector.y + this.y);
    }

    public deduct(vector: Vector2d): Vector2d
    {
        return new Vector2d(this.x - vector.x, this.y - vector.y);
    }

    public equals(vector: Vector2d): boolean
    {
        return this.x === vector.x && this.y === vector.y;
    }

    public length(): number
    {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    public distance(vector: Vector2d): number
    {
        return Math.sqrt(Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2));
    }
    
    public crossProduct(p: Vector2d): number
    {
        return (this.x * p.y) - (this.y * p.x)
    }

    public isAboveLine(l1: Vector2d, l2: Vector2d)
    {
        const v1 = l2.deduct(l1);
        const v2 = l2.deduct(this);
        const cross = v1.crossProduct(v2);
        return cross > 0;
    }

    public rotateAroundPivot(pivot: Vector2d, angle: number)
    {
        return new Vector2d(
            Math.cos(angle) * (this.x - pivot.x) - Math.sin(angle) * (this.y - pivot.y) + pivot.x, 
            Math.sin(angle) * (this.x - pivot.x) + Math.cos(angle) * (this.y - pivot.y) + pivot.y);
    }

    public toString(): string
    {
        return this._x + "_" + this._y;
    }

    public static fromString(key: string): Vector2d
    {
        const split = key.split("_");
        return new Vector2d(Number(split[0]), Number(split[1]));
    }
}

export const findAngle = (A: Vector2d, B: Vector2d, C: Vector2d)  =>
{
    var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));
    var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2));
    var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));

    const result = Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));

    if (isNaN(result))
    {
        return 0;
    }
    return result;
};