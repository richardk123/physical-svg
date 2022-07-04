import {Vector2d} from "./vector2d";

export interface Rectangle
{
    bottomLeft: Vector2d;
    topRight: Vector2d;
}

export const isOverlaping = (rect1: Rectangle, rect2: Rectangle) =>
{
    return isPointInRectangle(rect2.bottomLeft, rect1) ||
        isPointInRectangle(new Vector2d(rect2.bottomLeft.x, rect2.topRight.y), rect1) ||
        isPointInRectangle(new Vector2d(rect2.topRight.x, rect2.bottomLeft.y), rect1) ||
        isPointInRectangle(rect2.topRight, rect1);
};

const isPointInRectangle = (point: Vector2d, rectangle: Rectangle): boolean =>
{
    return rectangle.bottomLeft.x <= point.x && rectangle.topRight.x >= point.x &&
        rectangle.bottomLeft.y <= point.y && rectangle.topRight.y >= point.y;
};

export const createBoundingBox = (points: Array<Vector2d>): Rectangle =>
{
    const sortedX = [...points].sort((p1, p2) => p1.x - p2.x);
    const sortedY = [...points].sort((p1, p2) => p1.y - p2.y);

    const bottomLeftX = sortedX[0].x;
    const bottomLeftY = sortedY[0].y;

    const topRightX = sortedX[sortedX.length -1].x;
    const topRightY = sortedY[sortedY.length -1].y;

    return {
        bottomLeft: new Vector2d(bottomLeftX, bottomLeftY),
        topRight: new Vector2d(topRightX, topRightY)
    };
};