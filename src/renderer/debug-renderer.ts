export class DebugRenderer implements Renderer
{
    private _prevTime = 0;

    constructor(svg: HTMLElement)
    {
        const canvas = document.createElement('canvas');

        canvas.width = svg.clientWidth;
        canvas.height = svg.clientHeight;

        svg.parentElement!.append(canvas)
    }

    render(time: number)
    {
        this._prevTime = time;
        window.requestAnimationFrame((t) => this.render(t));
    }
}