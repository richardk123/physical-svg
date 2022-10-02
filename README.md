physical-svg
==========================================================================================

Is typescript library for node.js that runs physical simulation on your svg picture in browser. This project uses awesome 2d physic library matterjs and for bezier curves bezier-js.

[![Build Status](https://app.travis-ci.com/richardk123/physical-svg.svg?branch=main)](https://travis-ci.org/liabru/matter-js)

Installation
---
```
npm install physical-svg
```
or use js directly https://raw.githubusercontent.com/richardk123/physical-svg/main/dist/bundle.js with basic use example https://github.com/richardk123/physical-svg/blob/main/dist/example_usage.html

How to use?
-----------

```ts
PhysicalSvg(svgElement)
    .usePathAggregator()
    .withGravity({x: 0, y: 1})
    .withLimitVelocityPlugin(8)
    .withLimitAngularVelocityPlugin(Math.PI / 100)
    .withBorderCollider()
    .withMouseInteraction(0.01)
    .withDebugRenderer(debugElement!)
    .startSimulation({colliderWidth: 5, restitution: .9, friction: 0, frictionAir: 0});
```

Demo
---
https://richardk123.github.io/physical-svg-examples/

Limitations
---

:warning:
This library only supports path elements <path d="..." >. Please use 3rd party software (inkscape) and transform Object to path (https://bytexd.com/how-to-convert-objects-to-paths-in-inkscape/) if you want the objects to be animated by physics.
Also please check if your svg element and it's children contains transform attribute and apply the transformation to paths (if not the transformation will not be applied to colliders).
In current version path command A is not implemented and will throw error in log, but the A command can be avoided using C command in path.
:warning:

API
---

### PhysicalSvg(svgElement: HtmlElement): AggregatorBuilder

Offers to choose between useCollisionAggregator(), usePathAggregator() useCustomAggregator(aggregator: Aggregator)

### .useCollisionAggregator(): SimulationBuilder

Aggregate svg commands to group by checking is the commands are intersecting, e.g. checks curve X line curve X curve...

### .usePathAggregator(): SimulationBuilder

Aggregate svg commands by path specified in svg content

### .useCustomAggregator(aggregator: Aggregator): SimulationBuilder

Use your own better aggregator

### .withGravity({x: number, y: number): SimulationBuilder

Set gravity vector

### .withLimitVelocityPlugin(maxSpeed: number): SimulationBuilder

Set max speed for all objects in scene. This is useful if colliders are thin and with high speed they are passing through themselves.

### .withLimitAngularVelocityPlugin(maxSpeed: number): SimulationBuilder

Set max angular velocity in radians. This is useful if colliders are thin and with high speed they are passing through themselves.

### .withBorderCollider(): SimulationBuilder

Create a collider around svg borders.

### .withMouseInteraction(mouseForce: number): SimulationBuilder

Mouse can interact with physical objects.

### .withScrollInteraction(scrollForce: number): SimulationBuilder

Force is applied to physical object when scrolling through page.

### .withDebugRenderer(elementToAddCanvas?: HTMLElement): SimulationBuilder

Use if you want to see what is going on in physics engine.

### .withCustomPlugin(plugin: PhysicsPlugin): SimulationBuilder

Your own awesome plugin.

### .startSimulation(config: BodyConfig): StopPhysicalSvg

start simulation loop and return StopPhysicalSvg
