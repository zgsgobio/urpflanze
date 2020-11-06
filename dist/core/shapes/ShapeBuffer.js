var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import Bounding, { TTempBounding } from "../math/bounding";
import ShapePrimitive from "./ShapePrimitive";
import { EShapePrimitiveAdaptMode } from "../types/shape-base";
/**
 * @category Core.Shapes
 */
var ShapeBuffer = /** @class */ (function (_super) {
    __extends(ShapeBuffer, _super);
    /**
     * Creates an instance of ShapeBuffer.
     *
     * @param {IShapeBufferSettings} [settings={}]
     * @memberof ShapeBuffer
     */
    function ShapeBuffer(settings) {
        if (settings === void 0) { settings = {}; }
        var _a;
        var _this = this;
        settings.type = settings.type || 'ShapeBuffer';
        settings.adaptMode = (_a = settings.adaptMode) !== null && _a !== void 0 ? _a : EShapePrimitiveAdaptMode.Scale;
        _this = _super.call(this, settings) || this;
        if (typeof settings.shape === 'undefined') {
            console.warn('[Urpflanze:ShapeBuffer] ShapeBuffer require a buffer passed from `shape` property');
            _this.shape = ShapeBuffer.EMPTY_BUFFER;
        }
        else
            _this.shape = Float32Array.from(settings.shape);
        _this.bindBuffer();
        _this.bStatic = _this.isStatic();
        _this.bStaticIndexed = _this.isStaticIndexed();
        return _this;
    }
    /**
     *  Unset buffer
     *
     * @param {boolean} [bClearIndexed=false]
     * @param {boolean} [bPropagateToParents=false]
     * @memberof ShapeLoop
     */
    ShapeBuffer.prototype.clearBuffer = function (bClearIndexed, bPropagateToParents) {
        if (bClearIndexed === void 0) { bClearIndexed = false; }
        if (bPropagateToParents === void 0) { bPropagateToParents = true; }
        _super.prototype.clearBuffer.call(this, bClearIndexed, bPropagateToParents);
        this.bindBuffer();
        // this.shapeBuffer = ShapeBuffer.buffer2Dto3D(this.shapeBuffer)
    };
    /**
     * Apply sideLength on <mark>.shape</mark> buffer and calculate bounding
     *
     * @private
     * @memberof ShapeBuffer
     */
    ShapeBuffer.prototype.bindBuffer = function () {
        var shapeBuffer = this.adaptMode !== EShapePrimitiveAdaptMode.None
            ? ShapePrimitive.adaptBuffer(this.shape, this.adaptMode)
            : Float32Array.from(this.shape);
        var tmpBounding = [undefined, undefined, undefined, undefined];
        for (var i = 0, len = shapeBuffer.length; i < len; i += 2) {
            shapeBuffer[i] *= this.sideLength[0];
            shapeBuffer[i + 1] *= this.sideLength[1];
            Bounding.add(tmpBounding, shapeBuffer[i], shapeBuffer[i + 1]);
        }
        Bounding.bind(this.currentGenerationPrimitiveBounding, tmpBounding);
        this.shapeBuffer = shapeBuffer;
    };
    /**
     * Return length of buffer
     *
     * @returns {number}
     * @memberof ShapeBase
     */
    ShapeBuffer.prototype.getBufferLength = function () {
        if (this.buffer && this.buffer.length > 0)
            return this.buffer.length;
        return this.shapeBuffer.length * this.getRepetitionCount();
    };
    /**
     * Return a buffer of children shape or loop generated buffer
     *
     * @protected
     * @param {number} generateId
     * @param {ISceneChildPropArguments} propArguments
     * @returns {Float32Array}
     * @memberof ShapeBase
     */
    ShapeBuffer.prototype.generateBuffer = function (generateId, propArguments) {
        if (this.bindSideLength(propArguments)) {
            this.bindBuffer();
        }
        return this.shapeBuffer;
    };
    /**
     * Set shape
     *
     * @param {(Float32Array)} [shape]
     * @memberof ShapeBase
     */
    ShapeBuffer.prototype.setShape = function (shape) {
        this.shape = shape;
        this.clearBuffer(true);
    };
    /**
     * Subdivide buffer n times
     *
     * @param {number} [level=1]
     * @memberof ShapeBuffer
     */
    ShapeBuffer.prototype.subdivide = function (level) {
        if (level === void 0) { level = 1; }
        var subdivided = this.shape;
        if (subdivided && subdivided.length > 0) {
            for (var i = 0; i < level; i++)
                subdivided = ShapeBuffer.subdivide(subdivided, this.bClosed);
            this.setShape(subdivided);
        }
    };
    /**
     * Subdivide buffer
     *
     * @static
     * @param {Float32Array} shape
     * @param {boolean} [bClosed=true]
     * @returns {(Float32Array)}
     * @memberof ShapeBuffer
     */
    ShapeBuffer.subdivide = function (shape, bClosed) {
        if (bClosed === void 0) { bClosed = true; }
        var shapeLength = shape.length;
        var subdivided = new Float32Array(shapeLength * 2 - (bClosed ? 0 : 2));
        for (var i = 0; i < shapeLength; i += 2) {
            if (i === 0) {
                subdivided[0] = shape[0];
                subdivided[1] = shape[1];
            }
            else {
                var px = shape[i - 2];
                var py = shape[i - 1];
                var x = shape[i];
                var y = shape[i + 1];
                var nx = (x + px) / 2;
                var ny = (y + py) / 2;
                subdivided[(i - 1) * 2] = nx;
                subdivided[(i - 1) * 2 + 1] = ny;
                subdivided[i * 2] = x;
                subdivided[i * 2 + 1] = y;
            }
        }
        if (bClosed) {
            subdivided[(shapeLength - 1) * 2] = (shape[0] + shape[shapeLength - 2]) / 2;
            subdivided[(shapeLength - 1) * 2 + 1] = (shape[1] + shape[shapeLength - 1]) / 2;
        }
        return subdivided;
    };
    return ShapeBuffer;
}(ShapePrimitive));
export default ShapeBuffer;
//# sourceMappingURL=ShapeBuffer.js.map