import {Vector2d} from "../base/vector2d";

export const GRAVITY = 0.5;
export const SIMULATION_SPEED = 6;

export interface Simulation
{
    simulate(index: number, frameDuration: number, points: Array<Vector2d>): Array<Vector2d>;
}

export abstract class AbstractSimulation<T> implements Simulation
{
    private readonly _dataMap = new Map<number, T>();
    private _dataCreate: () => T;

    constructor(dataCreate: () => T)
    {
        this._dataCreate = dataCreate;
    }

    simulate(index: number, frameDuration: number, points: Array<Vector2d>): Array<Vector2d>
    {
        const data = this.getOrCreateData(index);
        return this.simulateWithData(data, frameDuration, points);
    }

    protected abstract simulateWithData(characterData: T, frameDuration: number, points: Array<Vector2d>): Array<Vector2d>;

    private getOrCreateData(index: number): T
    {
        let data = this._dataMap.get(index);
        if (data === undefined)
        {
            data = this._dataCreate();
            this._dataMap.set(index, data);
        }
        return data;
    }
}