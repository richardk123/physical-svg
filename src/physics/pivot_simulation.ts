import {findAngle, Vector2d} from "../base/vector2d";
import {AbstractSimulation, GRAVITY, SIMULATION_SPEED} from "./simulation";
import {DebugUI} from "../debug";
import {RelativeMousePosition} from "./mouse";

export class PivotSimulation extends AbstractSimulation<{pivot: Vector2d | undefined, angleAcceleration: number}>
{
    protected _debugUI: DebugUI;
    protected _mousePos: RelativeMousePosition;

    constructor(svg: HTMLElement)
    {
        super(() =>
        {
            return {pivot: undefined, angleAcceleration: 0};
        });

        this._debugUI = new DebugUI(svg);
        this._mousePos = new RelativeMousePosition(svg);
    }

    simulateWithData(data: {pivot: Vector2d, angleAcceleration: number}, frameDuration: number, points: Vector2d[]): Vector2d[]
    {
        // initialize pivot only first time
        if (data.pivot === undefined)
        {
            data.pivot = this.findPivot(points);
        }

        const centerOfMass = this.findCenterOfMass(points);

        // mouseForce
        const relativeMousePos = this._mousePos.position;
        const mouseForceVector = centerOfMass.deduct(relativeMousePos).opposite();
        const f = mouseForceVector.unit().multiply(10 / mouseForceVector.length()).opposite();
        data.angleAcceleration += this.calculateTangentForce(data.pivot, centerOfMass, f);

        // gravity
        const gravity = new Vector2d(0, GRAVITY);
        data.angleAcceleration += this.calculateTangentForce(data.pivot, centerOfMass, gravity);

        // friction
        data.angleAcceleration *= 0.98;

        // special case
        if (isNaN(data.angleAcceleration))
        {
            data.angleAcceleration = 0;
        }

        return points.map(point =>
        {
            const rotationAngle = data.angleAcceleration * (Math.PI / 180) * (frameDuration / SIMULATION_SPEED);
            return point.rotateAroundPivot(data.pivot, rotationAngle);
        });
    }

    private calculateTangentForce(pivot: Vector2d, centerOfMass: Vector2d, force: Vector2d): number
    {
        const forcePosition = centerOfMass.add(force);
        const cancelledForcePosition = centerOfMass.deduct(pivot).add(centerOfMass);
        const angle = findAngle(forcePosition, centerOfMass, cancelledForcePosition);

        // this._debugUI.drawLine(centerOfMass, centerOfMass.add(force.multiply(100)), "blue");
        // this._debugUI.drawLine(centerOfMass, cancelledForcePosition, "green");

        if (forcePosition.isAboveLine(cancelledForcePosition, pivot))
        {
            return Math.sin(angle) * force.length();
        }
        else
        {
            return -Math.sin(angle)* force.length();
        }
    }

    private findPivot(points: Vector2d[])
    {
        const centerOfMass = this.findCenterOfMass(points);
        const mostTopPoint = [...points].sort((p1, p2) => p1.y - p2.y)[0];
        return new Vector2d(centerOfMass.x, mostTopPoint.y);
    }

    private findCenterOfMass = (points: Array<Vector2d>): Vector2d =>
    {
        const total = points.reduce((acc, cur) =>
        {
            acc.x += cur.x;
            acc.y += cur.y;
            return acc;
        }, {x: 0, y: 0});

        return new Vector2d(total.x / points.length, total.y / points.length);
    }
}