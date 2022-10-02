import {Vector} from "matter-js";
import {EllipticalArcCommandMadeAbsolute} from "svg-path-parser";

export const findDistance = (x: number, y: number, x1: number, y1: number): number =>
{
    return Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
}

export const findDistanceVec = (p1: Vector, p2: Vector): number =>
{
    return findDistance(p1.x, p1.y, p2.x, p2.y);
}

export const findCenterOfLine = (p1: Vector, p2: Vector): Vector =>
{
    return Vector.create((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
}

export const length = (p: Vector): number =>
{
    return Math.sqrt(Math.pow(p.x, 2) + Math.pow(p.y, 2));
}

export const multiplyVec = (p1: Vector, p2: Vector): Vector =>
{
    return Vector.create(p1.x * p2.x, p1.y * p2.y);
}

export const vectorEquals = (p1: Vector, p2: Vector): boolean =>
{
    return p1.x === p2.x && p1.y === p2.y;
}

export const findAngle = (x: number, y: number, x1: number, y1: number): number =>
{
    const Vx = x - x1;
    const Vy = y - y1;

    let radians;

    if (Vx || Vy)
    {
        radians = Math.atan2(Vy, Vx) - Math.PI;
    } else
    {
        radians = 0;
    }

    if (radians < 0) {
        radians += 2*Math.PI;
    }
    return radians;
}

export const rotatePointAroundCenterPoint = (cx: number, cy: number, x: number, y: number, angle: number): {x: number, y: number} =>
{
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
    const ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return {x: nx, y: ny};
}

export const findArcCircuitPoints = (arc: EllipticalArcCommandMadeAbsolute, pointCount: number): {x: number, y: number}[] =>
{
    // TODO: implement
    return [];
}