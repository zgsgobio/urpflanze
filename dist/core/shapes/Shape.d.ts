import ShapeBase from "./ShapeBase";
import SceneChild from "../SceneChild";
import { IShapeBounding, IShapeSettings } from "../types/shape-base";
import { IRepetition, ISceneChildPropArguments } from "../types/scene-child";
/**
 * Container of ShapeBase or Group, it applies transformations on each repetition
 *
 * @category Core.Shapes
 */
declare class Shape extends ShapeBase {
    /**
     * child shape
     *
     * @type {(SceneChild)}
     * @memberof ShapeBase
     */
    shape?: SceneChild;
    /**
     * Creates an instance of Shape.
     *
     * @param {ShapeSettings} [settings={}]
     * @memberof Shape
     */
    constructor(settings?: IShapeSettings);
    /**
     * Check if shape is static
     *
     * @returns {boolean}
     * @memberof Shape
     */
    isStatic(): boolean;
    /**
     * Check if shape has static index
     *
     * @returns {boolean}
     * @memberof Shape
     */
    isStaticIndexed(): boolean;
    /**
     * Find shape by id or name
     *
     * @param {number | string} idOrName
     * @returns {(SceneChild | null)}
     * @memberof Shape
     */
    find(idOrName: number | string): SceneChild | null;
    /**
     * Return length of buffer
     *
     * @param {ISceneChildPropArguments} propArguments
     * @returns {number}
     * @memberof Shape
     */
    getBufferLength(propArguments: ISceneChildPropArguments): number;
    /**
     * Return a buffer of children shape or loop generated buffer
     *
     * @protected
     * @param {number} generateId
     * @param {ISceneChildPropArguments} propArguments
     * @returns {Float32Array}
     * @memberof ShapeBase
     */
    protected generateBuffer(generateId: number, propArguments: ISceneChildPropArguments): Float32Array;
    /**
     * Return bounding
     *
     * @param {boolean} bDirectSceneChild
     * @returns {IShapeBounding}
     * @memberof Shape
     */
    getBounding(bDirectSceneChild: boolean): IShapeBounding;
    protected addIndex(frameLength: number, repetition: IRepetition): void;
    /**
     * Set shape
     *
     * @param {(SceneChild | undefined)} [shape]
     * @memberof ShapeBase
     */
    setShape(shape: SceneChild | undefined): void;
}
export default Shape;
//# sourceMappingURL=Shape.d.ts.map