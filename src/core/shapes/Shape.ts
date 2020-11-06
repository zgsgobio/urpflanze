import ShapeBase from '@core/shapes/ShapeBase'
import SceneChild from '@core/SceneChild'
import { IShapeBounding, IShapeSettings } from '@core/types/shape-base'
import Scene from '@core/Scene'
import { IRepetition, ISceneChildPropArguments } from '@core/types/scene-child'
import { IBufferIndex } from '@core/types/shape-base'

/**
 * Container of ShapeBase or Group, it applies transformations on each repetition
 *
 * @category Core.Shapes
 */
class Shape extends ShapeBase {
	/**
	 * child shape
	 *
	 * @type {(SceneChild)}
	 * @memberof ShapeBase
	 */
	public shape?: SceneChild

	/**
	 * Creates an instance of Shape.
	 *
	 * @param {ShapeSettings} [settings={}]
	 * @memberof Shape
	 */
	constructor(settings: IShapeSettings = {}) {
		settings.type = settings.type || 'Shape'
		super(settings)

		if (settings.shape instanceof SceneChild) {
			this.shape = settings.shape
		} else {
			console.warn(
				"[Urpflanze:Shape] requires the 'shape' property to be instance of SceneChild,\nYou passed:",
				settings.shape
			)
		}

		this.bStatic = this.isStatic()
		this.bStaticIndexed = this.isStaticIndexed()
	}

	/**
	 * Check if shape is static
	 *
	 * @returns {boolean}
	 * @memberof Shape
	 */
	public isStatic(): boolean {
		return super.isStatic() && (this.shape ? this.shape.isStatic() : true)
	}

	/**
	 * Check if shape has static index
	 *
	 * @returns {boolean}
	 * @memberof Shape
	 */
	public isStaticIndexed(): boolean {
		return super.isStaticIndexed() && (this.shape ? this.shape.isStaticIndexed() : true)
	}

	/**
	 * Find shape by id or name
	 *
	 * @param {number | string} idOrName
	 * @returns {(SceneChild | null)}
	 * @memberof Shape
	 */
	public find(idOrName: number | string): SceneChild | null {
		if (this.id === idOrName || this.name === idOrName) return this

		if (this.shape) return this.shape.find(idOrName)

		return null
	}

	/**
	 * Return length of buffer
	 *
	 * @param {ISceneChildPropArguments} propArguments
	 * @returns {number}
	 * @memberof Shape
	 */
	public getBufferLength(propArguments: ISceneChildPropArguments): number {
		if (this.bStatic && this.buffer && this.buffer.length > 0) return this.buffer.length

		const childBufferLength = this.shape ? this.shape.getBufferLength(propArguments) : 0

		return childBufferLength * this.getRepetitionCount()
	}

	/**
	 * Return a buffer of children shape or loop generated buffer
	 *
	 * @protected
	 * @param {number} generateId
	 * @param {ISceneChildPropArguments} propArguments
	 * @returns {Float32Array}
	 * @memberof ShapeBase
	 */
	protected generateBuffer(generateId: number, propArguments: ISceneChildPropArguments): Float32Array {
		if (this.shape) {
			this.shape.generate(generateId, false, propArguments)

			return this.shape.getBuffer() || Shape.EMPTY_BUFFER
		}

		return Shape.EMPTY_BUFFER
	}

	/**
	 * Return bounding
	 *
	 * @param {boolean} bDirectSceneChild
	 * @returns {IShapeBounding}
	 * @memberof Shape
	 */
	public getBounding(bDirectSceneChild: boolean): IShapeBounding {
		if (bDirectSceneChild && this.shape) {
			return this.shape.getBounding(false)
		}
		return this.bounding
	}

	protected addIndex(frameLength: number, repetition: IRepetition) {
		if (this.shape) {
			const indexedBuffer = this.indexedBuffer as Array<IBufferIndex>
			const childIndexedBuffer = this.shape.getIndexedBuffer() || []
			const parent = {
				shape: this,
				frameLength,
				repetition: {
					type: repetition.type,
					angle: repetition.angle,
					index: repetition.index,
					count: repetition.count,
					offset: repetition.offset,
					row: {
						index: repetition.row.index,
						count: repetition.row.count,
						offset: repetition.row.offset,
					},
					col: {
						index: repetition.col.index,
						count: repetition.col.count,
						offset: repetition.col.offset,
					},
				},
			}

			const buildParent = (f: IBufferIndex, parent: IBufferIndex): IBufferIndex => {
				return {
					shape: f.shape,
					repetition: f.repetition,
					frameLength: f.frameLength,
					parent: f.parent ? buildParent(f.parent, parent) : parent,
				}
			}

			for (let i = 0, len = childIndexedBuffer.length; i < len; i++) {
				const currentIndexed = { ...childIndexedBuffer[i] }

				if (currentIndexed.parent) {
					currentIndexed.parent = buildParent(currentIndexed.parent, parent)
				} else {
					currentIndexed.parent = parent
				}

				indexedBuffer.push(currentIndexed)
			}
		}
	}

	/**
	 * Set shape
	 *
	 * @param {(SceneChild | undefined)} [shape]
	 * @memberof ShapeBase
	 */
	public setShape(shape: SceneChild | undefined): void {
		if (typeof shape === 'undefined') {
			this.shape = undefined
			this.clearBuffer(true, true)
		} else {
			this.scene && Scene.propagateToChilden(shape, this.scene)

			this.shape = shape

			this.shape.clearBuffer(true, true)
		}
	}
}

export default Shape