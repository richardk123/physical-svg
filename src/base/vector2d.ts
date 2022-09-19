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

    public multiplyV(v: Vector2d): Vector2d
    {
        return new Vector2d(this.x * v.x, this.y * v.y);
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

    public toString(): string
    {
        return this._x + "_" + this._y;
    }

    public static random(): Vector2d
    {
        return new Vector2d(Math.random(), Math.random());
    }

    public static fromString(key: string): Vector2d
    {
        const split = key.split("_");
        return new Vector2d(Number(split[0]), Number(split[1]));
    }
}