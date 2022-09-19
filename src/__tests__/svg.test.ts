import {mapAndFilterCommands} from "../base/command_mapper";
import {Command, makeAbsolute, parseSVG} from "svg-path-parser";
import {CollisionAggregator} from "../agregator/collision/collision_aggregator";
import {mapCommandsToShape} from "../base/shape_mapper";
import {SvgData} from "../base/svg_data";
import {Shape} from "../base/shape/shape";

test('square from LHV', () =>
{
    const aggregatedCommands = createHtmlAndParse(
        '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M 10 10 H 90 V 90 H 10 L 10 10"/>' +
              '</svg>'
    );

    expect(aggregatedCommands.length).toBe(1);
    expect(aggregatedCommands[0].length).toBe(5);
});

test('square from LHVZ', () =>
{
    const aggregatedCommands = createHtmlAndParse(
        '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M 10 10 H 90 V 90 H 10 Z" fill="transparent" stroke="black"/>' +
              '</svg>'
    );

    expect(aggregatedCommands.length).toBe(1);
    expect(aggregatedCommands[0].length).toBe(5);
});

// test('bezier CS', () =>
// {
//     const aggregatedCommands = createHtmlAndParse(
//         '<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">' +
//                 '<path d="M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" stroke="black" fill="transparent"/>' +
//               '</svg>'
//     );
//
//     expect(aggregatedCommands.length).toBe(1);
//     expect(aggregatedCommands[0].length).toBe(1);
// });

const createHtmlAndParse = (html: string): Shape[][] =>
{
    document.body.innerHTML = html;

    const paths = global.document.getElementsByTagName("svg")[0].getElementsByTagName('path');
    const pathArray = Array.prototype.slice.call(paths);
    const commands = pathArray
        .map(path =>
        {
            const absoluteCommands = makeAbsolute(parseSVG(path.getAttribute("d")));
            const filteredCommands = mapAndFilterCommands(absoluteCommands);
            return mapCommandsToShape(filteredCommands, new SvgData(1));
        })
        .flatMap(cmdArray => cmdArray);

    return new CollisionAggregator().aggregate(commands);
}