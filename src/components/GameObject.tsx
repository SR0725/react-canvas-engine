import { FC } from 'react';
import { GameObject as GameObjectType } from '@/types/GameObject';
import { loadImage } from '@/utils/loadImage';

declare global {
	namespace JSX {
		interface IntrinsicElements {
			gameObject: GameObjectType;
		}
	}
}
const GameObject: FC<Readonly<GameObjectType>> = (rawObjectState) => {
	const { imageSrc } = rawObjectState;
	let imageElement: HTMLImageElement | undefined = undefined;
	if (imageSrc) {
		imageElement = loadImage(imageSrc);
	}
	const objectState = { ...rawObjectState, imageElement };
	return <gameObject {...objectState}></gameObject>;
};

export default GameObject;
