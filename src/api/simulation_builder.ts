import {BodyConfig} from "../physics/body/body_config";
import {MatterJsPhysics} from "../physics/matterjs_physics";
import {SvgData} from "../base/svg_data";
import {expandCommands} from "../base/command_mapper";
import {makeAbsolute, parseSVG} from "svg-path-parser";
import {Aggregator} from "../agregator/aggregator";
import {PhysicsPlugin} from "../physics/physics_plugin";
import {GravityPlugin} from "../physics/plugins/gravity_plugin";
import {ViewColliderBorder} from "../physics/plugins/view_collider_border_plugin";
import {MousePlugin} from "../physics/plugins/mouse_plugin";
import {RendererPlugin} from "../physics/plugins/renderer_plugin";
import {ProductionRenderer} from "../renderer/production_renderer";
import {ScrollPlugin} from "../physics/plugins/scroll_plugin";
import {LimitVelocityPlugin} from "../physics/plugins/limit_velocity_plugin";
import {LimitAngularVelocityPlugin} from "../physics/plugins/limit_angular_velocity_plugin";
import {StopPhysicalSvg} from "./stop_builder";

export class SimulationBuilder
{
    private readonly _aggregator: Aggregator;
    private readonly _svg: HTMLElement;
    private readonly _plugins: PhysicsPlugin[];

    constructor(aggregator: Aggregator, svg: HTMLElement)
    {
        this._aggregator = aggregator;
        this._svg = svg;
        this._plugins = [];
    }

    public withGravity(gravity: { x: number, y: number}): SimulationBuilder
    {
        this._plugins.push(new GravityPlugin(gravity));
        return this;
    }

    public withBorderCollider(): SimulationBuilder
    {
        this._plugins.push(new ViewColliderBorder());
        return this;
    }

    public withMouseInteraction(mouseForce: number): SimulationBuilder
    {
        this._plugins.push(new MousePlugin(mouseForce));
        return this;
    }

    public withScrollInteraction(scrollForce: number): SimulationBuilder
    {
        this._plugins.push(new ScrollPlugin(scrollForce));
        return this;
    }

    public withDebugRenderer(elementToAddCanvas?: HTMLElement): SimulationBuilder
    {
        this._plugins.push(new RendererPlugin(elementToAddCanvas));
        return this;
    }

    public withCustomPlugin(plugin: PhysicsPlugin): SimulationBuilder
    {
        this._plugins.push(plugin);
        return this;
    }

    public withLimitVelocityPlugin(maxSpeed: number)
    {
        this._plugins.push(new LimitVelocityPlugin(maxSpeed));
        return this;
    }

    public withLimitAngularVelocityPlugin(maxSpeed: number)
    {
        this._plugins.push(new LimitAngularVelocityPlugin(maxSpeed));
        return this;
    }

    public startSimulation(config: BodyConfig): StopPhysicalSvg
    {
        const svgData = this.createSvgData();
        const physics = new MatterJsPhysics(svgData, config, this._plugins);

        const renderer = new ProductionRenderer();
        renderer.renderLoop(svgData, physics);

        return new StopPhysicalSvg(physics, renderer);
    }

    private createSvgData(): SvgData
    {
        const paths = Array.prototype.slice.call(this._svg.getElementsByTagName('path'));

        const pathCommandArray = paths
            .map(path => path.getAttribute("d"))
            .map(pathString => expandCommands(makeAbsolute(parseSVG(pathString))));

        const aggregatedCommands = this._aggregator.aggregate(pathCommandArray);

        return new SvgData(this._svg, pathCommandArray, aggregatedCommands);
    }
}