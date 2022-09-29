import * as Matter from "matter-js";
import {Body, World} from "matter-js";
import {SvgData} from "../base/svg_data";
import {AllCommandTypes} from "../base/command_mapper";
import {findCenterOfCommand} from "../base/command_utils";
import {physBodyFactory} from "./body/body_factory";
import {CommandBody} from "./body/command_body";
import {BodyConfig} from "./body/body_config";
import {PhysicsPlugin} from "./physics_plugin";

const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;

export class MatterJsPhysics
{
    readonly _svgData: SvgData;
    readonly _engine: Matter.Engine;
    readonly _world: Matter.World;
    private _commandBodies: CommandBody<AllCommandTypes>[];

    constructor(svgData: SvgData, globalConfig: BodyConfig, plugins: PhysicsPlugin[])
    {
        this._svgData = svgData;
        this._engine = Engine.create();
        this._world = this._engine.world;
        this._commandBodies = [];
        const rootBodies: Body[] = [];

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

            rootBodies.push(rootBody);
        });

        plugins.forEach(plugin => plugin.setup(svgData, this._engine, rootBodies));
    }

    update(aggregatedShapes: AllCommandTypes[][]): void
    {
        // update physics
        Engine.update(this._engine);
        this._commandBodies.forEach(body => body.updateSvgCommand());
    }

}