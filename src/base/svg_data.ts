export class SvgData
{
    private _svg: HTMLElement;
    private _strokeWidth: number;
    private _width: number;
    private _height: number;

    private _viewBox: {minx: number, miny: number; width: number, height: number} | undefined;

    constructor(svg: HTMLElement)
    {
        this._svg = svg;
        // this._strokeWidth = Number(svg.getAttribute("stroke-width")!.toLowerCase().replace("px", ""));
        this._strokeWidth = 15;
        this._width = svg.clientWidth;
        this._height = svg.clientHeight;

        this.setViewBox(svg);
    }

    get svg(): HTMLElement
    {
        return this._svg;
    }

    get width(): number
    {
        return this._width;
    }

    get height(): number
    {
        return this._height;
    }

    get viewBox(): {minx: number, miny: number; width: number, height: number} | undefined
    {
        return this._viewBox;
    }

    private setViewBox(svg: HTMLElement): void
    {
        const viewBoxString = svg.getAttribute("viewBox");
        if (viewBoxString === null)
        {
            return;
        }
        const values = viewBoxString.split(/[ ,]/).filter(Boolean).map(Number);

        this._viewBox = {minx: values[0], miny: values[1], width: values[2], height: values[3]};
    }

    // TODO: calculate
    get relativeStrokeWidth(): number
    {
        return this._strokeWidth;
    }
}