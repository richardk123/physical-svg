import {Physics} from "./physics";
import {Shape} from "../base/shape/shape";
import {Command} from "svg-path-parser";
import * as Matter from "matter-js";
import {AbstractBody} from "./matterjs/body/abstract_body";
import {physBodyFactory} from "./matterjs/body/body_factory";
import {Body, Events, Render, World} from "matter-js";

const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;

export class MatterJsPhysics implements Physics
{
    readonly _engine: Matter.Engine;
    readonly _world: Matter.World;
    private _bodies: AbstractBody<Shape<Command>>[];

    constructor()
    {
        this._engine = Engine.create();
        this._world = this._engine.world;
        this._bodies = [];
    }

    init(aggregatedShapes: Shape<Command>[][]): void
    {
        // create bounding box
        const ground = Bodies.rectangle(250, 650, 500, 100, {isStatic: true});
        World.add(this._world, ground);

        aggregatedShapes.forEach(shapes =>
        {
            const aggregatedBodies = shapes.map(shape => physBodyFactory(shape));
            this._bodies = this._bodies.concat(aggregatedBodies);

            const midX = shapes
                .map(shape => shape.center.x)
                .reduce((acc, cur) => acc + cur) / shapes.length;
            const midY = shapes
                .map(shape => shape.center.y)
                .reduce((acc, cur) => acc + cur) / shapes.length;

            const aggregatedBody = Bodies.circle(midX, midY, 300);
            Body.setParts(aggregatedBody, aggregatedBodies.map(physBody => physBody.body), false);
            World.add(this._world, aggregatedBody);
        })

        // create renderer
        const render = Render.create({
            element: document.body,
            engine: this._engine,
            options: {
                width: 500,
                height: 600,
                showAngleIndicator: true,
            }
        });

        Render.run(render);
    }

    update(aggregatedShapes: Shape<Command>[][], deltaTime: number): void
    {
        // update physics
        Engine.update(this._engine);
        this._bodies.forEach(body => body.setPositionsToShape());
    }

}