import {Vector} from "matter-js";

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

export const distance = (p1: Vector, p2: Vector): number =>
{
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
}

export const rotatePointAroundCenterPoint = (cx: number, cy: number, x: number, y: number, angle: number): {x: number, y: number} =>
{
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
    const ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return {x: nx, y: ny};
}