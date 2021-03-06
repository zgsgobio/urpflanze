import ScenePropUtilities from '@services/scene-utilities/ScenePropUtilities'

import { TAnimation } from '@services/types/animation'
import Simple from '@services/animation/Simple'
import { TSceneChildProp } from '@core/types/scene-child'
import Drawer from '@services/drawers/Drawer'

/**
 * @ignore
 * @internal
 * @category Services.Animation
 */
const Animation = {
	composeAnimation: (drawer: Drawer<any, any>, prop_name: string, animation: TAnimation): TSceneChildProp<any> => {
		switch (animation.type) {
			case 'simple': {
				const simpleAnimation = { ...animation.value }

				simpleAnimation.from = ScenePropUtilities.getTransformedValue(drawer, prop_name, simpleAnimation.from)
				simpleAnimation.to = ScenePropUtilities.getTransformedValue(drawer, prop_name, simpleAnimation.to)

				return Simple.compose(simpleAnimation)
			}
			case 'raw': {
				const rawValue = animation.value
				return eval(rawValue.raw)
			}
			// case 'random': {
			//     const randomValue = SetProp.getRandomFunctionForProp(prop_name)
			//     return ({ shape }) => randomValue(shape.rand())
			// }
		}
	},
}

export default Animation
