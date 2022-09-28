import {Physics} from "./physics";
import {Shape} from "../base/shape/shape";
import {Command} from "svg-path-parser";
import * as Matter from "matter-js";
import {AbstractBody} from "./matterjs/body/abstract_body";
import {physBodyFactory} from "./matterjs/body/body_factory";
import {Body, Common, Events, Render, Svg, World} from "matter-js";
import {SvgData} from "../base/svg_data";

const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;

export class MatterJsPhysics implements Physics
{
    readonly _svgData: SvgData;
    readonly _engine: Matter.Engine;
    readonly _world: Matter.World;
    private _bodies: AbstractBody<Shape<Command>>[];

    constructor(svgData: SvgData, aggregatedShapes: Shape<Command>[][])
    {
        this._svgData = svgData;
        this._engine = Engine.create();
        this._world = this._engine.world;
        this._bodies = [];

        // this._engine.gravity.y = 0;

        this.createColliderFrame(svgData);

        aggregatedShapes.forEach(shapes =>
        {
            const midX = shapes
                .map(shape => shape.center.x)
                .reduce((acc, cur) => acc + cur) / shapes.length;
            const midY = shapes
                .map(shape => shape.center.y)
                .reduce((acc, cur) => acc + cur) / shapes.length;

            const rootBody = Bodies.circle(midX, midY, 3000, {friction: 0, restitution: .9});
            // const aggregatedBody = Body.create({position: {x: midX, y: midY}});

            const aggregatedBodies = shapes.map(shape => physBodyFactory(shape, rootBody));
            this._bodies = this._bodies.concat(aggregatedBodies);

            const bodies = aggregatedBodies.map(physBody => physBody.body).flatMap(body => body);
            Body.setParts(rootBody, bodies, false);
            World.add(this._world, rootBody);
        })

        this.createRenderer(svgData);
    }

    private createRenderer(svgData: SvgData): void
    {
        // create renderer
        const render = Render.create({
            element: document.body,
            engine: this._engine,
            options: {
                wireframes: true,
                width: svgData.width,
                height: svgData.height,
                // showPositions: true,
                showAngleIndicator: false,
            },
        });

        if (svgData.viewBox !== undefined)
        {
            Render.lookAt(render, this._bodies.flatMap(body => body.body), {
                x: (svgData.viewBox.minx + (svgData.viewBox.width)) / 2,
                y: (svgData.viewBox.miny + (svgData.viewBox.height)) / 2
            }, true);
        }
        else
        {
            Render.lookAt(render, this._bodies.flatMap(body => body.body), {
                x: svgData.width,
                y: svgData.height
            }, true);
        }


            // Render.lookAt(render, this._bodies.flatMap(body => body.body), {
            //     x: svgData.width,
            //     y: svgData.height
            // }, true);

        // Render.setPixelRatio(render, svgData.width / svgData.height)

        Render.run(render);
    }

    private createColliderFrame(svgData: SvgData): void
    {
        let width = svgData.width;
        let height = svgData.height;
        let offsetX = 0;
        let offsetY = 0;
        const wallSize = 100;

        if (svgData.viewBox !== undefined)
        {
            const vbWidth =  svgData.viewBox.width;
            const vbHeight = svgData.viewBox.height;
            const vbWhRatio = vbWidth < vbHeight ? (vbHeight / vbWidth) : (vbWidth / vbHeight);
            const whRatio = width < height ? (height / width) : (width / height);

            if (width < height)
            {
                if (vbWidth < vbHeight)
                {
                    height = vbHeight * (1 / whRatio) * vbWhRatio;
                    width = vbWidth;
                }
                else
                {
                    height = vbHeight * whRatio * vbWhRatio;
                    width = vbWidth;
                }
            }
            else
            {
                if (vbWidth <= vbHeight)
                {
                    width =  vbWidth * whRatio * vbWhRatio;
                    height = vbHeight;
                }
                else
                {
                    width =  vbWidth * (1 / whRatio) * vbWhRatio;
                    height = vbHeight;
                }
            }

            offsetX = svgData.viewBox.minx - (width - vbWidth) / 2;
            offsetY = svgData.viewBox.miny - (height - vbHeight) / 2;
        }

        const bottom = Bodies.rectangle(
            (width / 2) + offsetX,
            height + (wallSize / 2) + offsetY,
            width, wallSize, {isStatic: true});
        World.add(this._world, bottom);

        const top = Bodies.rectangle(
            (width / 2)  + offsetX,
            -(wallSize / 2) + offsetY,
            width, wallSize, {isStatic: true});
        World.add(this._world, top);

        const left = Bodies.rectangle(
            -(wallSize / 2) + offsetX,
            (height / 2)  + offsetY,
            wallSize, height, {isStatic: true});
        World.add(this._world, left);

        const right = Bodies.rectangle(
            width + (wallSize / 2) + offsetX,
            (height / 2) + offsetY,
            wallSize, height, {isStatic: true});
        World.add(this._world, right);

    }

    update(aggregatedShapes: Shape<Command>[][], deltaTime: number): void
    {
        // update physics
        Engine.update(this._engine);
        this._bodies.forEach(body => body.updateSvgCommand());
    }

}