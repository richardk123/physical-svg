import {Physics} from "./physics";
import * as Matter from "matter-js";
import {Body, Render, World} from "matter-js";
import {SvgData} from "../base/svg_data";
import {AllCommandTypes} from "../base/command_mapper";
import {findCenterOfCommand} from "../base/command_utils";
import {physBodyFactory} from "./matterjs/body/body_factory";
import {CommandBody} from "./matterjs/body/command_body";
import {BodyConfig} from "./matterjs/body/body_config";

const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;

export class MatterJsPhysics implements Physics
{
    readonly _svgData: SvgData;
    readonly _engine: Matter.Engine;
    readonly _world: Matter.World;
    private _commandBodies: CommandBody<AllCommandTypes>[];

    constructor(svgData: SvgData, globalConfig: BodyConfig, gravity?: {x: number, y: number})
    {
        this._svgData = svgData;
        this._engine = Engine.create();
        this._world = this._engine.world;
        this._commandBodies = [];

        if (gravity)
        {
            this._engine.gravity.x = gravity.x;
            this._engine.gravity.y = gravity.y;
        }

        this.createColliderFrame(svgData);

        svgData.aggregatedCommands.forEach(commands =>
        {
            const midX = commands
                .map(command => findCenterOfCommand(command).x)
                .reduce((acc, cur) => acc + cur) / commands.length;
            const midY = commands
                .map(command => findCenterOfCommand(command).y)
                .reduce((acc, cur) => acc + cur) / commands.length;

            const rootBody = Bodies.circle(midX, midY, 3000, globalConfig);

            const commandBodies = commands.map(command => physBodyFactory(command, globalConfig.colliderWidth));
            this._commandBodies = this._commandBodies.concat(commandBodies);

            const physBodies = commandBodies.map(physBody => physBody.bodies).flatMap(body => body);
            Body.setParts(rootBody, physBodies, false);
            World.add(this._world, rootBody);
        })
    }

    update(aggregatedShapes: AllCommandTypes[][]): void
    {
        // update physics
        Engine.update(this._engine);
        this._commandBodies.forEach(body => body.updateSvgCommand());
    }

    public debugRenderLoop(svgData: SvgData): void
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
                if (vbWidth < vbHeight)
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
}