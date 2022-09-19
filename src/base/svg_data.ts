export class SvgData
{
     private _strokeWidth: number;

    constructor(strokeWidth: number)
    {
        // this._strokeWidth = Number(svg.getAttribute("stroke-width")!.toLowerCase().replace("px", ""));
        this._strokeWidth = strokeWidth;
    }

    // TODO: calculate
    get relativeStrokeWidth(): number
    {
        return this._strokeWidth;
    }
}