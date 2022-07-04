import { Vector2d } from "./base/vector2d";

export class DebugUI
{
    private readonly _svgElem: HTMLElement;

    constructor(svg: HTMLElement)
    {
        this._svgElem = svg;
    }

    clear()
    {
      const circles = this._svgElem.getElementsByTagName("circle");
      
      for (let i = 0; i < circles.length; i++)
      {
        circles.item(i)?.remove();
      }

      const lines = this._svgElem.getElementsByTagName("line");
      for (let i = 0; i < lines.length; i++)
      {
        lines.item(i)?.remove();
      }
    }

    drawCharacterPoints(characterPoints: Array<Vector2d>)
    {
        characterPoints.forEach(point =>
        {
            const color = `yellow`;
            this.drawCircle(point, color, 1);
        });
    }

    drawCircle(position: Vector2d, color: string, size: number)
    {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', "circle");

        circle.setAttribute("cx", position.x.toFixed(0).toString());
        circle.setAttribute("cy", position.y.toFixed(0).toString());
        circle.setAttribute("r", size.toString());
  
        circle.setAttribute("fill", color);
  
        this._svgElem.appendChild(circle);
    }

    drawLine(p1: Vector2d, p2: Vector2d, color: string)
    {
        const line = document.createElementNS('http://www.w3.org/2000/svg', "line");

        line.setAttribute("x1", p1.x.toFixed(0).toString());
        line.setAttribute("y1", p1.y.toFixed(0).toString());

        line.setAttribute("x2", p2.x.toFixed(0).toString());
        line.setAttribute("y2", p2.y.toFixed(0).toString());
  
        line.setAttribute("stroke", color);
        line.setAttribute("stroke-width", "2");
  
        this._svgElem.appendChild(line);
    }
}
