export class PathData
{
    private _rotate: { a: number, x: number, y: number }[] = [];
    private _scale: {x: number, y: number}[] = [];
    private _translate: {x: number, y: number}[] = [];
    private _skewX: number[] = [];
    private _skewY: number[] = [];
    private _path: SVGPathElement;

    constructor(path: SVGPathElement)
    {
        this._path = path;
    }

    public get rotate(): { a: number, x: number, y: number }[]
    {
        return this._rotate;
    }

    public get scale(): { x: number, y: number }[]
    {
        return this._scale;
    }

    public get translate(): { x: number, y: number }[]
    {
        return this._translate;
    }

    public get skewX(): number[]
    {
        return this._skewX;
    }

    public get skewY(): number[]
    {
        return this._skewY;
    }

}


const findPaths = (svg: HTMLElement): PathData[] =>
{
    const paths = Array.prototype.slice.call(svg.getElementsByTagName('path'));
    return paths.map(path =>
    {
        const pathData = new PathData(path);
        const parents = [svg].concat(findParentsTillSvg(path));

        parents.forEach(parent =>
        {
            const transform = parent.getAttribute("transform");

            if (transform === null)
            {
                return null;
            }

            const rotate = parseTransformParameters(transform, /rotate\\((.*?)\\)/);
            pathData.rotate.push({a: rotate[0], x: rotate[1], y: rotate[2]});

            const scale = parseTransformParameters(transform, /scale\\((.*?)\\)/);
            pathData.translate.push({x: rotate[0], y: rotate[1]});

            const translate = parseTransformParameters(transform, /translate\\((.*?)\\)/);
            pathData.translate.push({x: rotate[0], y: rotate[1]});

            const skewX = parseTransformParameters(transform, /skewx\\((.*?)\\)/);
            pathData.skewX.push(rotate[0]);

            const skewY = parseTransformParameters(transform, /skewy\\((.*?)\\)/);
            pathData.skewY.push(rotate[0]);

            const svgMatrix = new SVGMatrix();
            svgMatrix.skewX()
            svgMatrix.toJSON()

        });

        return pathData;
    });
}

const parseTransformParameters = (transform: string, regExp: RegExp): number[] =>
{
    const params = transform.toLowerCase().match(regExp);

    if (params === null)
    {
        return [];
    }

    return params[0].match(/\((.*?)\)/)![0].split(" ").map(val => Number(val));
}

const findParentsTillSvg = (element: HTMLElement): HTMLElement[] =>
{
    const result: HTMLElement[] = [];
    result.push(element);

    if (element.parentElement !== null && element.tagName.toLowerCase() !== 'svg')
    {
        return result.concat(findParentsTillSvg(element.parentElement))
    }

    return result;
}