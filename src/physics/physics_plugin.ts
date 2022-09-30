import {SvgData} from "../base/svg_data";
import {Body, Engine} from "matter-js";

export interface PhysicsPlugin
{
    /**
     * called once on start
     * @param svgData - all data for svg image
     * @param engine - physical engine
     * @param rootBodies - top level bodies created from svg
     */
    setup(svgData: SvgData, engine: Engine, rootBodies: Body[]): void;

    // stop and remove everything created
    stop(): void;

}