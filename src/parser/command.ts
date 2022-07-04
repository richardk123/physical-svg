import { Vector2d } from "../base/vector2d";

export interface Command
{
    get name(): String;
    get numberOfPositions(): number;
    get positions(): Array<Vector2d>;
    set positions(positions: Array<Vector2d>);
    serialize(): string;
}

abstract class AbstractCommand implements Command
{
    private _name: String;
    private _parameters: number[];

    constructor(name: String, parameters: string[])
    {
        this._name = name;
        this._parameters = parameters.map(p => parseFloat(p));
    }

    abstract get numberOfPositions(): number;

    abstract get positions(): Vector2d[];

    abstract set positions(positions: Vector2d[]);
    
    get name(): String
    {
        return this._name;
    }

    serialize(): string
    {
        return this._name + " " + this._parameters.map(p => p.toFixed(2)).join(" ");
    };

    protected getParameter = (index: number): number => this._parameters[index];

    protected setParameter = (position: Vector2d, startIndex: number): void => 
    {
        this._parameters[startIndex] = position.x;
        this._parameters[startIndex + 1] = position.y;
    };
}

export class SinglePositionCommand extends AbstractCommand
{
    get numberOfPositions() 
    {
        return 1;
    };

    get positions() 
    {
        return [new Vector2d(this.getParameter(0), this.getParameter(1))];
    } 

    set positions(positions: Vector2d[])
    {
        this.setParameter(positions[0], 0);
    };
}

export class ClosePathCommand extends AbstractCommand
{
    get numberOfPositions() 
    {
        return 0;
    };

    get positions()
    {
        return new Array<Vector2d>();
    }

    set positions(positions: Vector2d[])
    {

    }

    serialize(): string
    {
        return this.name.toString();
    };
}

export class SimpleBezierCurveCommand extends AbstractCommand
{
    get numberOfPositions() 
    {
        return 2;
    };

    get positions()
    {
        return [
            new Vector2d(this.getParameter(0), this.getParameter(1)),
            new Vector2d(this.getParameter(2), this.getParameter(3))
        ];
    };

    set positions(positions: Vector2d[])
    {
        this.setParameter(positions[0], 0);
        this.setParameter(positions[1], 2);
    };
}

export class BezierCurveCommand implements Command
{
    private _positions: Vector2d[];

    constructor(parameters: string[])
    {
        this._positions = parameters
            .map(p => parseFloat(p))
            .reduce((acc, cur, index, array) =>
            {
                if (index % 2 == 0)
                {
                    acc.push(new Vector2d(array[index], array[index + 1]));
                }
                return acc;
            }, new Array<Vector2d>())
    }

    get positions()
    {
        return this._positions;
    };

    get name(): String
    {
        return "C";
    }

    get numberOfPositions() 
    { 
        return this._positions.length;
    }

    serialize(): string
    {
        return this.name + " " + this._positions
            .map(p => p.x.toFixed(2) + " " + p.y.toFixed(2))
            .join(" ");
    };

    set positions(positions: Array<Vector2d>) 
    {
        this._positions = positions;
    };
}

export class ArcCommand extends AbstractCommand
{
    get numberOfPositions()
    {
        return 1;
    }

    get positions()
    {
        return [new Vector2d(this.getParameter(5), this.getParameter(6))];
    } 

    set positions(positions: Vector2d[])
    {
        this.setParameter(positions[0], 5);
    };
}