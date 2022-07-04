import {Vector2d} from "../base/vector2d";

export class RelativeMousePosition
{
    private _element: HTMLElement;
    private _mousePosition = new Vector2d(0, 0);

    constructor(element: HTMLElement)
    {
        this._element = element;
        document.addEventListener("mousemove", (ev: MouseEvent) =>
        {
            this._mousePosition = new Vector2d(ev.clientX, ev.clientY);
        });
    }

    get position(): Vector2d
    {
        let rect = this._element.getBoundingClientRect();
        let x = this._mousePosition.x - rect.left; //x position within the element.
        let y = this._mousePosition.y - rect.top;  //y position within the element.

        return new Vector2d(x, y);
    }
}