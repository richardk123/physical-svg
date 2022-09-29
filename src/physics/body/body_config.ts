export interface BodyConfig
{
    // number between 0 - 1
    friction?: number;

    // restitution  number between 0 - 1+
    restitution?: number;

    // relative width to path coordinates
    colliderWidth: number;

    // is physics applies to the body?
    isStatic?: boolean;

    // number between 0 - 1
    frictionAir?: number;
}