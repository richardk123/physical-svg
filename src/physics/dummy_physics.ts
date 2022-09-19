import {Physics} from "./physics";
import {Shape} from "../base/shape/shape";
import {
    Command,
    CurveToCommandMadeAbsolute,
    LineToCommandMadeAbsolute,
    MoveToCommandMadeAbsolute
} from "svg-path-parser";
import {Vector2d} from "../base/vector2d";

export class DummyPhysics implements Physics
{
    _directionMap: Map<number, Vector2d>;

    constructor()
    {
        this._directionMap = new Map<number, Vector2d>();
    }

    update(aggregatedShapes: Shape<Command>[][]): void
    {
        aggregatedShapes.forEach((shapes, index) =>
        {
            const direction = this.getDirectionForIndex(index);
            shapes.forEach(shape =>
            {
                switch (shape.command.code)
                {
                    case 'M':
                    {
                        const cmd = shape.command as MoveToCommandMadeAbsolute;

                        cmd.x += direction.x;
                        cmd.y += direction.y;
                        break;
                    }
                    case 'L':
                    {
                        const cmd = shape.command as LineToCommandMadeAbsolute;

                        cmd.x += direction.x;
                        cmd.y += direction.y;
                        break;
                    }
                    case 'C':
                    {
                        const cmd = shape.command as CurveToCommandMadeAbsolute;

                        cmd.x += direction.x;
                        cmd.y += direction.y;
                        cmd.x1 += direction.x;
                        cmd.y1 += direction.y;
                        cmd.x2 += direction.x;
                        cmd.y2 += direction.y;
                        break;
                    }
                }
            });
        });
    }

    private getDirectionForIndex(index: number): Vector2d
    {
        let result = this._directionMap.get(index);

        if (result === undefined)
        {
            result = Vector2d.random().multiply(0.1);
            this._directionMap.set(index, result);
        }

        return result;
    }

}