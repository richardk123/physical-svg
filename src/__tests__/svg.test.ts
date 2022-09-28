import {expandCommands} from "../base/command_mapper";
import {Command, makeAbsolute, parseSVG} from "svg-path-parser";
import {CollisionAggregator} from "../agregator/collision_aggregator";
import {mapCommandsToShape} from "../base/shape/shape_mapper";
import {Shape} from "../base/shape/shape";
import {TestSvgData} from "./collision_aggregator.test";

test('square from LHV', () =>
{
    const aggregatedShapes = createHtmlAndParse(
        '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M 10 10 H 90 V 90 H 10 L 10 10"/>' +
              '</svg>'
    );

    expect(aggregatedShapes.length).toBe(1);
    expect(aggregatedShapes[0].length).toBe(5);
});

test('square from LHVZ', () =>
{
    const aggregatedShapes = createHtmlAndParse(
        '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M 10 10 H 90 V 90 H 10 Z" fill="transparent" stroke="black"/>' +
              '</svg>'
    );

    expect(aggregatedShapes.length).toBe(1);
    expect(aggregatedShapes[0].length).toBe(4);
});

test('square from LHVZ relative', () =>
{
    const aggregatedShapes = createHtmlAndParse(
        '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M225 3v65h-9.5V3h9.5z" fill="transparent" stroke="black"/>' +
              '</svg>'
    );

    expect(aggregatedShapes.length).toBe(1);
    expect(aggregatedShapes[0].length).toBe(5);
});

// test('bezier CS', () =>
// {
//     const aggregatedShapes = createHtmlAndParse(
//         '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">' +
//                 '<path d="M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" stroke="black" fill="transparent"/>' +
//               '</svg>'
//     );
//
//     expect(aggregatedShapes.length).toBe(1);
//     expect(aggregatedShapes[0].length).toBe(1);
// });

const createHtmlAndParse = (html: string): Shape<Command>[][] =>
{
    document.body.innerHTML = html;

    const paths = global.document.getElementsByTagName("svg")[0].getElementsByTagName('path');
    const pathArray = Array.prototype.slice.call(paths);
    const commands = pathArray
        .map(path =>
        {
            const absoluteCommands = makeAbsolute(parseSVG(path.getAttribute("d")));
            const filteredCommands = expandCommands(absoluteCommands);
            return mapCommandsToShape(filteredCommands, new TestSvgData());
        })
        .flatMap(cmdArray => cmdArray);

    return new CollisionAggregator().aggregate(commands);
}