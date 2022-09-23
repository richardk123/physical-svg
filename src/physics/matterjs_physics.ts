import {Physics} from "./physics";
import {Shape} from "../base/shape/shape";
import {Command} from "svg-path-parser";
import * as Matter from "matter-js";
import {AbstractBody} from "./matterjs/body/abstract_body";
import {physBodyFactory} from "./matterjs/body/body_factory";
import {Body, Common, Events, Render, World} from "matter-js";

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

        this._engine.gravity.y = 0.1;
    }

    init(aggregatedShapes: Shape<Command>[][]): void
    {
        // create bounding box
        {
            const g1 = Bodies.rectangle(250, 650, 500, 100, {isStatic: true, friction: 1, restitution: 0});
            World.add(this._world, g1);

            const g2 = Bodies.rectangle(-50, 300, 100, 600, {isStatic: true, friction: 1, restitution: 0});
            World.add(this._world, g2);

            const g3 = Bodies.rectangle(550, 300, 100, 600, {isStatic: true, friction: 1, restitution: 0});
            World.add(this._world, g3);
        }

        aggregatedShapes.forEach(shapes =>
        {
            const midX = shapes
                .map(shape => shape.center.x)
                .reduce((acc, cur) => acc + cur) / shapes.length;
            const midY = shapes
                .map(shape => shape.center.y)
                .reduce((acc, cur) => acc + cur) / shapes.length;

            const rootBody = Bodies.circle(midX, midY, 3000, {friction: 0, restitution: .5});
            // const aggregatedBody = Body.create({position: {x: midX, y: midY}});

            const aggregatedBodies = shapes.map(shape => physBodyFactory(shape, rootBody));
            this._bodies = this._bodies.concat(aggregatedBodies);

            const bodies = aggregatedBodies.map(physBody => physBody.body).flatMap(body => body);
            Body.setParts(rootBody, bodies, false);
            World.add(this._world, rootBody);
        })

        // this.createStupidBodies().forEach(b => World.add(this._world, b));

        // create renderer
        const render = Render.create({
            element: document.body,
            engine: this._engine,
            options: {
                wireframes: true,
                width: 500,
                height: 600,
                // showPositions: true,
                // showAngleIndicator: true,
            },
        });

        // Render.lookAt(render, this._bodies[0].body, {
        //     x: 200,
        //     y: 150
        // });

        Render.run(render);
    }

    update(aggregatedShapes: Shape<Command>[][], deltaTime: number): void
    {
        // update physics
        Engine.update(this._engine);
        this._bodies.forEach(body => body.setPositionsToShape());
    }

}