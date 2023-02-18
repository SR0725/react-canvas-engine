import useOnMounted from '@/hooks/useOnMounted';
import useOnUpdated from '@/hooks/useOnUpdated';
import useOnUnmounted from '@/hooks/useOnUnmounted';
import {
	useInteractionData,
	InteractionDataProvider,
} from '@/components/Providers/InteractionDataProvider';
import CanvasEngine from '@/components/CanvasEngine';
import GameObject from '@/components/GameObject';
import { isCollide } from '@/utils/isCollide';
import { getDistance } from '@/utils/getDistance';

export type { GameObject as GameObjectType } from '@/types/GameObject';
export {
	useOnMounted,
	useOnUpdated,
	useOnUnmounted,
	useInteractionData,
	InteractionDataProvider,
	CanvasEngine,
	GameObject,
	isCollide,
	getDistance,
};
