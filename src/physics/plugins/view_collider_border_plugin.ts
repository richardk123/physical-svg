import {PhysicsPlugin} from "../physics_plugin";
import {Bodies, Engine, World, Body} from "matter-js";
import {SvgData} from "../../base/svg_data";

export class ViewColliderBorder implements PhysicsPlugin
{
    setup(svgData: SvgData, engine: Engine, rootBodies: Body[]): void
    {
        const world = engine.world;

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
        World.add(world, bottom);

        const top = Bodies.rectangle(
            (width / 2)  + offsetX,
            -(wallSize / 2) + offsetY,
            width, wallSize, {isStatic: true});
        World.add(world, top);

        const left = Bodies.rectangle(
            -(wallSize / 2) + offsetX,
            (height / 2)  + offsetY,
            wallSize, height, {isStatic: true});
        World.add(world, left);

        const right = Bodies.rectangle(
            width + (wallSize / 2) + offsetX,
            (height / 2) + offsetY,
            wallSize, height, {isStatic: true});
        World.add(world, right);
    }

}