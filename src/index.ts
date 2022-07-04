import { DebugUI } from "./debug";
import { CharacterPathParser } from "./parser/character_path_parser";
import { PathParser } from "./parser/path_parser";
import {PivotSimulation} from "./physics/pivot_simulation";
import { Simulation } from "./physics/simulation";

export const PhysicalSvg = (svg: HTMLElement) =>
{
    const debugUI = new DebugUI(svg);
    const paths = svg.getElementsByTagName('path');
    const pathArray = Array.prototype.slice.call(paths);

    pathArray.forEach(path =>
    {
        const pathParser = new CharacterPathParser(path.getAttribute("d"));
        const pivotSimulation = new PivotSimulation(svg);
        const renderer = new Renderer(pathParser, pivotSimulation, path, debugUI);

        renderer.render(0);
    });
}

class Renderer
{
    private _prevTime = 0;
    private readonly _pathParser: PathParser;
    private readonly _simulation: Simulation;
    private readonly _path: SVGPathElement;
    private readonly _debugUI: DebugUI;

    constructor(pathParser: PathParser, simulation: Simulation, path: SVGPathElement, debugUI: DebugUI)
    {
        this._pathParser = pathParser;
        this._simulation = simulation;
        this._path = path;
        this._debugUI = debugUI;
    }

    render(time: number)
    {
        this._debugUI.clear();

        const svgPath = this._pathParser.serialize((characterPositions, characterIndex) =>
        {
            return this._simulation.simulate(characterIndex, time - this._prevTime, characterPositions);
        });

        this._path.setAttribute("d", svgPath);
        this._prevTime = time;

        window.requestAnimationFrame((time) => this.render(time));
    }
}


