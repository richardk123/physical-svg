import {Bezier} from "bezier-js";

test('bezier LUT', () =>
{
    const curve = new Bezier([{x: 0, y: 0}, {x: 0, y: 5}, {x: 10, y: 5},{x: 10, y: 0}]);
    const lut = curve.getLUT(10);

    expect(lut[0].x).toBe(0);
    expect(lut[0].y).toBe(0);

    expect(lut[lut.length-1].x).toBe(10);
    expect(lut[lut.length-1].y).toBe(0);
});

test('bezier LUT real', () =>
{
    const curve = new Bezier([{x: 209.75, y: 66.16}, {x: 206.82259259259266, y: 79.42111111111112}, {x: 199.2107407407408, y: 86.88888888888889},{x: 188.67000000000002, y: 89.22999999999999}]);
    const lut = curve.getLUT(10);

    expect(lut[0].x).toBe(209.75);
    expect(lut[0].y).toBe(66.16);

    expect(lut[lut.length-1].x).toBe(188.67000000000002);
    expect(lut[lut.length-1].y).toBe(89.22999999999999);
});