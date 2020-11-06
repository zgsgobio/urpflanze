/**
 *
 * @category Services.DrawerCanvas
 * @class FrameBuffer
 */
declare class FrameBuffer {
    private frames;
    exist(frameNumber: number): boolean;
    get(frameNumber: number): ImageData | null;
    count(): number;
    push(frameNumber: number, context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D): void;
    flush(): void;
    getRenderedFrames(): Array<number>;
}
export default FrameBuffer;
//# sourceMappingURL=FrameBuffer.d.ts.map