/**
 * @category Services.Drawer
 */
export interface IDrawerOptions {
	time?: number
	noBackground?: boolean
	ghosts?: number
	ghostSkipTime?: number
	ghostSkipFunction?: (ghostIndex: number) => number
}

/**
 * @category Services.Drawer
 */
export interface IDrawerSVGOptions extends IDrawerOptions {
	decimals?: number
}

/**
 * @category Services.Drawer
 */
export interface IDrawerCanvasOptions extends IDrawerOptions {
	scale?: number
	clear?: boolean
	translate?: Array<number>
	simmetricLines?: number
	fixedLineWidth?: boolean
	backgroundImage?: CanvasImageSource
	backgroundImageFit?: 'cover' | 'contain'
}

/**
 * @category Services.Drawer
 */
export interface IDrawerCanvasEvents {
	'drawer-canvas:before_draw': {
		currentFrame: number
		currentTime: number
	}
	'drawer-canvas:buffer_loaded': void
	'drawer-canvas:buffer_flush': void
	'drawer-canvas:resize': void
}

/**
 * @category Services.Drawer
 */
export interface IDrawerSVGEvents {
	'drawer-svg:before_draw': {
		currentFrame: number
		currentTime: number
	}
}

/**
 * @category Services.Drawer
 */
export type TDrawerTransformation = 'none' | 'angle' | 'resolution-based' | 'resolution-scaled-based'

/**
 * @category Services.Drawer
 */
export type TDrawerValue = {
	type: 'drawer-transformation'
	value: any
}

/**
 * @category Services.Drawer
 */
export interface ISceneChildDrawerData {
	highlighted: boolean
	visible: boolean
	disableGhost: boolean
	composite:
		| 'source-over'
		| 'source-in'
		| 'source-out'
		| 'source-atop'
		| 'destination-over'
		| 'destination-in'
		| 'destination-out'
		| 'destination-atop'
		| 'lighter'
		| 'copy'
		| 'xor'
		| 'multiply'
		| 'screen'
		| 'overlay'
		| 'darken'
		| 'lighten'
		| 'color-dodge'
		| 'color-burn'
		| 'hard-light'
		| 'soft-light'
		| 'difference'
		| 'exclusion'
		| 'hue'
		| 'saturation'
		| 'color'
		| 'luminosity'
}
