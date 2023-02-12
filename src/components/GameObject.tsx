import React from 'react';
import { GameObject as GameObjectType } from '@/types/GameObject';

declare global {
	namespace JSX {
		interface IntrinsicElements {
			gameObject: GameObjectType;
		}
	}
}
const GameObject: React.FC<Readonly<GameObjectType>> = (objectState) => {
	return <gameObject {...objectState}></gameObject>;
};

export default GameObject;
